import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageHeader from '@/components/PageHeader.vue'

describe('PageHeader', () => {
  it('renders header element', () => {
    const wrapper = mount(PageHeader)

    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(PageHeader)

    const header = wrapper.find('header')
    expect(header.classes()).toContain('bg-primary')
    expect(header.classes()).toContain('text-primary-content')
  })

  it('renders logo image', () => {
    const wrapper = mount(PageHeader)

    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/logo.webp')
    expect(logo.attributes('alt')).toBe('JobTello.Co')
    expect(logo.attributes('loading')).toBe('lazy')
  })

  it('has correct logo styling classes', () => {
    const wrapper = mount(PageHeader)

    const logo = wrapper.find('img')
    expect(logo.classes()).toContain('h-12')
    expect(logo.classes()).toContain('w-auto')
  })

  it('has proper container structure', () => {
    const wrapper = mount(PageHeader)

    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
    expect(container.classes()).toContain('px-4')
    expect(container.classes()).toContain('py-4')
  })

  it('has flex layout for logo container', () => {
    const wrapper = mount(PageHeader)

    const flexContainer = wrapper.find('.flex')
    expect(flexContainer.exists()).toBe(true)
    expect(flexContainer.classes()).toContain('items-center')
  })

  it('renders without any props', () => {
    // Test that component can be mounted without any props
    expect(() => {
      mount(PageHeader)
    }).not.toThrow()
  })
})
