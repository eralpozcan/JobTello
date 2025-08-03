import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageFooter from '@/components/PageFooter.vue'

describe('PageFooter', () => {
  it('renders footer element', () => {
    const wrapper = mount(PageFooter)

    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(PageFooter)

    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('footer')
    expect(footer.classes()).toContain('footer-center')
    expect(footer.classes()).toContain('p-10')
    expect(footer.classes()).toContain('bg-base-300')
    expect(footer.classes()).toContain('text-base-content')
  })

  it('renders all navigation links', () => {
    const wrapper = mount(PageFooter)

    const links = wrapper.findAll('a[class="link link-hover"]')
    expect(links).toHaveLength(4)

    const expectedLinks = ['About us', 'Contact', 'Jobs', 'Press kit']
    links.forEach((link, index) => {
      expect(link.text()).toBe(expectedLinks[index])
      expect(link.attributes('href')).toBe('#')
    })
  })

  it('renders social media icons', () => {
    const wrapper = mount(PageFooter)

    const twitterIcon = wrapper.findComponent({ name: 'LucideTwitter' })
    const youtubeIcon = wrapper.findComponent({ name: 'LucideYoutube' })
    const facebookIcon = wrapper.findComponent({ name: 'LucideFacebook' })

    expect(twitterIcon.exists()).toBe(true)
    expect(youtubeIcon.exists()).toBe(true)
    expect(facebookIcon.exists()).toBe(true)
  })

  it('has correct social media links', () => {
    const wrapper = mount(PageFooter)

    const socialLinks = wrapper.findAll('a[target="_blank"]')
    expect(socialLinks).toHaveLength(3)

    expect(socialLinks[0].attributes('href')).toBe('https://twitter.com')
    expect(socialLinks[1].attributes('href')).toBe('https://youtube.com')
    expect(socialLinks[2].attributes('href')).toBe('https://facebook.com')

    // Check security attributes
    socialLinks.forEach((link) => {
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.attributes('target')).toBe('_blank')
    })
  })

  it('has correct social media button styling', () => {
    const wrapper = mount(PageFooter)

    const socialButtons = wrapper.findAll('a[target="_blank"]')
    socialButtons.forEach((button) => {
      expect(button.classes()).toContain('btn')
      expect(button.classes()).toContain('btn-ghost')
      expect(button.classes()).toContain('btn-circle')
      expect(button.classes()).toContain('hover:bg-primary')
      expect(button.classes()).toContain('hover:text-primary-content')
      expect(button.classes()).toContain('transition-colors')
    })
  })

  it('renders copyright text', () => {
    const wrapper = mount(PageFooter)

    expect(wrapper.text()).toContain('Copyright © 2025 - All right reserved by JobTello.Co')
  })

  it('has proper grid layout structure', () => {
    const wrapper = mount(PageFooter)

    const grids = wrapper.findAll('.grid-flow-col')
    expect(grids).toHaveLength(2) // One for navigation, one for social media

    grids.forEach((grid) => {
      expect(grid.classes()).toContain('grid')
      expect(grid.classes()).toContain('gap-4')
    })
  })

  it('social media icons have correct size classes', () => {
    const wrapper = mount(PageFooter)

    const icons = wrapper.findAll('.w-6.h-6')
    expect(icons).toHaveLength(3) // Twitter, YouTube, Facebook icons
  })

  it('navigation links are reactive', () => {
    const wrapper = mount(PageFooter)

    // Test that the component uses v-for correctly
    const navigationSection = wrapper.find('.grid-flow-col')
    const links = navigationSection.findAll('a')

    expect(links).toHaveLength(4)
    expect(links[0].attributes('href')).toBe('#')
  })
})
