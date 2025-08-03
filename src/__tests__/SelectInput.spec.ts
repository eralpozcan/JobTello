import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectInput from '@/components/SelectInput.vue'

const mockOptions = ['Option 1', 'Option 2', 'Option 3']

describe('SelectInput', () => {
  it('renders with required props', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        placeholder: 'Select an option',
        options: mockOptions,
      },
    })

    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Test Label')
  })

  it('renders placeholder as first option', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        placeholder: 'Choose one',
        options: mockOptions,
      },
    })

    const options = wrapper.findAll('option')
    expect(options[0].text()).toBe('Choose one')
    expect(options[0].attributes('value')).toBe('')
  })

  it('renders all options correctly', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        placeholder: 'Select an option',
        options: mockOptions,
      },
    })

    const options = wrapper.findAll('option')
    // +1 for placeholder option
    expect(options).toHaveLength(mockOptions.length + 1)

    mockOptions.forEach((option, index) => {
      expect(options[index + 1].text()).toBe(option)
      expect(options[index + 1].attributes('value')).toBe(option)
    })
  })

  it('displays selected value', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: 'Option 2',
        label: 'Test Label',
        placeholder: 'Select an option',
        options: mockOptions,
      },
    })

    const select = wrapper.find('select')
    expect(select.element.value).toBe('Option 2')
  })

  it('emits update:modelValue when selection changes', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        placeholder: 'Select an option',
        options: mockOptions,
      },
    })

    const select = wrapper.find('select')
    await select.setValue('Option 1')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Option 1'])
  })

  it('can reset to empty value', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: 'Option 1',
        label: 'Test Label',
        placeholder: 'Select an option',
        options: mockOptions,
      },
    })

    const select = wrapper.find('select')
    await select.setValue('')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        placeholder: 'Select an option',
        options: mockOptions,
      },
    })

    expect(wrapper.find('.form-control').exists()).toBe(true)
    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.label-text').exists()).toBe(true)
    expect(wrapper.find('select').classes()).toContain('select')
    expect(wrapper.find('select').classes()).toContain('select-bordered')
    expect(wrapper.find('select').classes()).toContain('w-full')
  })

  it('handles empty options array', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        placeholder: 'No options',
        options: [],
      },
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(1) // Only placeholder
    expect(options[0].text()).toBe('No options')
  })
})
