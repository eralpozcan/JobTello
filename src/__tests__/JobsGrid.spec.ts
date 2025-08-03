import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import JobsGrid from '@/components/JobsGrid.vue'
import JobCard from '@/components/JobCard.vue'
import type { Job } from '@/stores/jobs'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/job/:id', name: 'job-detail', component: { template: '<div>Job Detail</div>' } },
  ],
})

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Company',
    location: 'Istanbul, Turkey',
    category: 'Technology',
    description: 'We are looking for a skilled frontend developer.',
    postedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Software Inc',
    location: 'Ankara, Turkey',
    category: 'Technology',
    description: 'Join our backend team.',
    postedAt: '2024-01-16T10:00:00Z',
  },
]

describe('JobsGrid', () => {
  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [],
        loading: true,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.loading-spinner').exists()).toBe(true)
    expect(wrapper.text()).toContain('')
  })

  it('shows error message when error exists', () => {
    const errorMessage = 'Failed to load jobs'
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [],
        loading: false,
        error: errorMessage,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.alert-error').exists()).toBe(true)
    expect(wrapper.text()).toContain(errorMessage)
    expect(wrapper.findComponent({ name: 'LucideAlertCircle' }).exists()).toBe(true)
  })

  it('shows job count when jobs are loaded', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: mockJobs,
        loading: false,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('2 jobs found')
  })

  it('shows singular job count for one job', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [mockJobs[0]],
        loading: false,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('1 job found')
  })

  it('renders JobCard components for each job', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: mockJobs,
        loading: false,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    const jobCards = wrapper.findAllComponents(JobCard)
    expect(jobCards).toHaveLength(2)
    expect(jobCards[0].props('job')).toEqual(mockJobs[0])
    expect(jobCards[1].props('job')).toEqual(mockJobs[1])
  })

  it('shows no jobs found message when jobs array is empty', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [],
        loading: false,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('0 jobs found')
    expect(wrapper.text()).toContain('No jobs found')
    expect(wrapper.text()).toContain('Try adjusting your search criteria')
    expect(wrapper.text()).toContain('🔍')
  })

  it('has correct grid layout for jobs', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: mockJobs,
        loading: false,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-2')
    expect(grid.classes()).toContain('lg:grid-cols-3')
    expect(grid.classes()).toContain('gap-6')
  })

  it('shows loading state correctly', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [],
        loading: true,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.loading').classes()).toContain('loading-spinner')
    expect(wrapper.find('.loading').classes()).toContain('loading-lg')
  })

  it('error alert has correct styling', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [],
        loading: false,
        error: 'Test error',
      },
      global: {
        plugins: [router],
      },
    })

    const alert = wrapper.find('.alert')
    expect(alert.classes()).toContain('alert-error')
    expect(alert.classes()).toContain('mb-8')
  })

  it('does not show loading or error when jobs are present', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: mockJobs,
        loading: false,
        error: null,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.loading').exists()).toBe(false)
    expect(wrapper.find('.alert-error').exists()).toBe(false)
    expect(wrapper.findAllComponents(JobCard)).toHaveLength(2)
  })

  it('prioritizes loading state over error state', () => {
    const wrapper = mount(JobsGrid, {
      props: {
        jobs: [],
        loading: true,
        error: 'Some error',
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.alert-error').exists()).toBe(false)
  })
})
