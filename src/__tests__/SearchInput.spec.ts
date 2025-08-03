import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with default props', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Search')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('renders with custom props', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        label: 'Custom Label',
        placeholder: 'Custom placeholder',
      },
    })

    expect(wrapper.find('label').text()).toBe('Custom Label')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Custom placeholder')
  })

  it('displays initial value', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'initial value',
      },
    })

    expect(wrapper.find('input').element.value).toBe('initial value')
  })

  it('updates local value when typing', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test input')

    expect(input.element.value).toBe('test input')
  })

  it('emits update:modelValue with debounce', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        debounceMs: 300,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test')

    // Should not emit immediately
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    // Fast forward time
    vi.advanceTimersByTime(300)
    await nextTick()

    // Should emit after debounce
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })

  it('cancels previous debounce when typing quickly', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        debounceMs: 300,
      },
    })

    const input = wrapper.find('input')

    // Type first value
    await input.setValue('test1')
    vi.advanceTimersByTime(100)

    // Type second value before debounce completes
    await input.setValue('test2')
    vi.advanceTimersByTime(300)
    await nextTick()

    // Should only emit the latest value
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted?.length).toBe(1)
    expect(emitted?.[0]).toEqual(['test2'])
  })

  it('updates local value when modelValue prop changes', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'initial',
      },
    })

    await wrapper.setProps({ modelValue: 'updated' })
    await nextTick()

    expect(wrapper.find('input').element.value).toBe('updated')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.find('.form-control').exists()).toBe(true)
    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.label-text').exists()).toBe(true)
    expect(wrapper.find('input').classes()).toContain('input')
    expect(wrapper.find('input').classes()).toContain('input-bordered')
    expect(wrapper.find('input').classes()).toContain('w-full')
  })
})
