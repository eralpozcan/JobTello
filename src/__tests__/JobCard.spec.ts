import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import JobCard from '@/components/JobCard.vue'
import type { Job } from '@/stores/jobs'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/job/:id', name: 'job-detail', component: { template: '<div>Job Detail</div>' } },
  ],
})

const mockJob: Job = {
  id: 1,
  title: 'Frontend Developer',
  company: 'Tech Company',
  location: 'Istanbul, Turkey',
  category: 'Technology',
  description: 'We are looking for a skilled frontend developer to join our team.',
  postedAt: '2024-01-15T10:00:00Z',
}

describe('JobCard', () => {
  it('renders job information correctly', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Frontend Developer')
    expect(wrapper.text()).toContain('Tech Company')
    expect(wrapper.text()).toContain('Istanbul, Turkey')
    expect(wrapper.text()).toContain('Technology')
    expect(wrapper.text()).toContain('We are looking for a skilled frontend developer')
  })

  it('formats date correctly', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Jan 15, 2024')
  })

  it('has correct router link', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        plugins: [router],
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('View Details')
  })

  it('displays location icon', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        plugins: [router],
      },
    })

    const mapPinIcon = wrapper.findComponent({ name: 'LucideMapPin' })
    expect(mapPinIcon.exists()).toBe(true)
  })

  it('applies hover effect classes', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        plugins: [router],
      },
    })

    const card = wrapper.find('.card')
    expect(card.classes()).toContain('hover:shadow-xl')
    expect(card.classes()).toContain('transition-shadow')
  })
})
