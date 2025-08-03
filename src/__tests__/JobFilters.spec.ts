import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobFilters from '@/components/JobFilters.vue'
import SearchInput from '@/components/SearchInput.vue'
import SelectInput from '@/components/SelectInput.vue'

const mockProps = {
  searchQuery: '',
  selectedLocation: '',
  selectedCategory: '',
  locations: ['Istanbul', 'Ankara', 'Izmir'],
  categories: ['Technology', 'Marketing', 'Sales'],
}

describe('JobFilters', () => {
  it('renders all filter components', () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    expect(wrapper.findComponent(SearchInput).exists()).toBe(true)
    expect(wrapper.findAllComponents(SelectInput)).toHaveLength(2)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('passes correct props to SearchInput', () => {
    const wrapper = mount(JobFilters, {
      props: {
        ...mockProps,
        searchQuery: 'developer',
      },
    })

    const searchInput = wrapper.findComponent(SearchInput)
    expect(searchInput.props('modelValue')).toBe('developer')
    expect(searchInput.props('placeholder')).toBe('Job title or company...')
    expect(searchInput.props('label')).toBe('Search Jobs')
    expect(searchInput.props('debounceMs')).toBe(500)
  })

  it('passes correct props to location SelectInput', () => {
    const wrapper = mount(JobFilters, {
      props: {
        ...mockProps,
        selectedLocation: 'Istanbul',
      },
    })

    const selectInputs = wrapper.findAllComponents(SelectInput)
    const locationSelect = selectInputs[0]

    expect(locationSelect.props('modelValue')).toBe('Istanbul')
    expect(locationSelect.props('label')).toBe('Location')
    expect(locationSelect.props('placeholder')).toBe('All Locations')
    expect(locationSelect.props('options')).toEqual(['Istanbul', 'Ankara', 'Izmir'])
  })

  it('passes correct props to category SelectInput', () => {
    const wrapper = mount(JobFilters, {
      props: {
        ...mockProps,
        selectedCategory: 'Technology',
      },
    })

    const selectInputs = wrapper.findAllComponents(SelectInput)
    const categorySelect = selectInputs[1]

    expect(categorySelect.props('modelValue')).toBe('Technology')
    expect(categorySelect.props('label')).toBe('Category')
    expect(categorySelect.props('placeholder')).toBe('All Categories')
    expect(categorySelect.props('options')).toEqual(['Technology', 'Marketing', 'Sales'])
  })

  it('emits update:searchQuery when SearchInput changes', async () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    const searchInput = wrapper.findComponent(SearchInput)
    await searchInput.vm.$emit('update:modelValue', 'new search')

    expect(wrapper.emitted('update:searchQuery')).toBeTruthy()
    expect(wrapper.emitted('update:searchQuery')?.[0]).toEqual(['new search'])
  })

  it('emits update:selectedLocation when location SelectInput changes', async () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    const selectInputs = wrapper.findAllComponents(SelectInput)
    const locationSelect = selectInputs[0]
    await locationSelect.vm.$emit('update:modelValue', 'Ankara')

    expect(wrapper.emitted('update:selectedLocation')).toBeTruthy()
    expect(wrapper.emitted('update:selectedLocation')?.[0]).toEqual(['Ankara'])
  })

  it('emits update:selectedCategory when category SelectInput changes', async () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    const selectInputs = wrapper.findAllComponents(SelectInput)
    const categorySelect = selectInputs[1]
    await categorySelect.vm.$emit('update:modelValue', 'Marketing')

    expect(wrapper.emitted('update:selectedCategory')).toBeTruthy()
    expect(wrapper.emitted('update:selectedCategory')?.[0]).toEqual(['Marketing'])
  })

  it('emits clearFilters when clear button is clicked', async () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    const clearButton = wrapper.find('button')
    await clearButton.trigger('click')

    expect(wrapper.emitted('clearFilters')).toBeTruthy()
  })

  it('has correct CSS classes and structure', () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    const container = wrapper.find('.bg-base-200')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('rounded-lg')
    expect(container.classes()).toContain('p-6')
    expect(container.classes()).toContain('mb-8')

    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-4')
    expect(grid.classes()).toContain('gap-4')
    expect(grid.classes()).toContain('items-end')
  })

  it('clear button has correct styling', () => {
    const wrapper = mount(JobFilters, {
      props: mockProps,
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('btn')
    expect(button.classes()).toContain('btn-outline')
    expect(button.text()).toBe('Clear Filters')
  })

  it('handles empty arrays for locations and categories', () => {
    const wrapper = mount(JobFilters, {
      props: {
        ...mockProps,
        locations: [],
        categories: [],
      },
    })

    const selectInputs = wrapper.findAllComponents(SelectInput)
    expect(selectInputs[0].props('options')).toEqual([])
    expect(selectInputs[1].props('options')).toEqual([])
  })
})
