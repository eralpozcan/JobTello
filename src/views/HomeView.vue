<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue'
import { useJobsStore } from '@/stores/jobs'
import { useHead } from '@unhead/vue'

const JobFilters = defineAsyncComponent(() => import('@/components/JobFilters.vue'))
const JobsGrid = defineAsyncComponent(() => import('@/components/JobsGrid.vue'))

useHead({
  title: 'JobTello.Co - Find Your Dream Job',
  meta: [
    { name: 'description', content: 'JobTello.Co - Discover thousands of job opportunities across various industries. Find your dream job with our advanced search and filtering options.' },
    { name: 'keywords', content: 'JobTello, jobs, careers, employment, job search, hiring, recruitment, dream job' },
    { property: 'og:title', content: 'JobTello.Co - Find Your Dream Job' },
    { property: 'og:description', content: 'JobTello.Co - Discover thousands of job opportunities across various industries. Find your dream job with our advanced search and filtering options.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'JobTello.Co' }
  ]
})

const jobsStore = useJobsStore()

onMounted(() => {
  jobsStore.fetchJobs()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <JobFilters :search-query="jobsStore.searchQuery" :selected-location="jobsStore.selectedLocation"
      :selected-category="jobsStore.selectedCategory" :locations="jobsStore.locations"
      :categories="jobsStore.categories" @update:search-query="jobsStore.searchQuery = $event"
      @update:selected-location="jobsStore.selectedLocation = $event"
      @update:selected-category="jobsStore.selectedCategory = $event" @clear-filters="jobsStore.clearFilters()" />

    <JobsGrid :jobs="jobsStore.filteredJobs" :loading="jobsStore.loading" :error="jobsStore.error" />
  </div>
</template>
