import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Job {
  id: number
  title: string
  company: string
  location: string
  category: string
  description: string
  postedAt: string
}

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Filters
  const searchQuery = ref('')
  const selectedLocation = ref('')
  const selectedCategory = ref('')

  // Computed properties
  const filteredJobs = computed(() => {
    return jobs.value.filter((job) => {
      const matchesSearch =
        !searchQuery.value ||
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesLocation =
        !selectedLocation.value ||
        job.location.toLowerCase().includes(selectedLocation.value.toLowerCase())

      const matchesCategory = !selectedCategory.value || job.category === selectedCategory.value

      return matchesSearch && matchesLocation && matchesCategory
    })
  })

  const categories = computed(() => {
    const uniqueCategories = [...new Set(jobs.value.map((job) => job.category))]
    return uniqueCategories.sort()
  })

  const locations = computed(() => {
    const uniqueLocations = [...new Set(jobs.value.map((job) => job.location))]
    return uniqueLocations.sort()
  })

  // Actions
  const fetchJobs = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/jobs.json')
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await response.json()
      jobs.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const getJobById = (id: number) => {
    return jobs.value.find((job) => job.id === id)
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setLocationFilter = (location: string) => {
    selectedLocation.value = location
  }

  const setCategoryFilter = (category: string) => {
    selectedCategory.value = category
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedLocation.value = ''
    selectedCategory.value = ''
  }

  return {
    // State
    jobs,
    loading,
    error,
    searchQuery,
    selectedLocation,
    selectedCategory,

    filteredJobs,
    categories,
    locations,

    // Actions
    fetchJobs,
    getJobById,
    setSearchQuery,
    setLocationFilter,
    setCategoryFilter,
    clearFilters,
  }
})
