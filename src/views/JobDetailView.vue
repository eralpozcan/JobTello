<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore, type Job } from '@/stores/jobs'
import { useHead } from '@unhead/vue'

const JobCard = defineAsyncComponent(() => import('@/components/JobCard.vue'))
const JobDetailCard = defineAsyncComponent(() => import('@/components/JobDetailCard.vue'))

const LucideArrowLeft = defineAsyncComponent(() => import('@/components/Icons/LucideArrowLeft.vue'))

interface DataLayerEvent {
  event: string
  page_title?: string
  page_location?: string
  job_id?: number
  job_title?: string
  job_company?: string
  job_category?: string
  job_location?: string
  button_name?: string
  timestamp?: string
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[]
  }
}

const pushToDataLayer = (event: DataLayerEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const eventWithTimestamp = {
      ...event,
      timestamp: new Date().toISOString()
    }
    window.dataLayer.push(eventWithTimestamp)
  }
}

const trackPageView = (jobData?: Job) => {
  pushToDataLayer({
    event: 'page_view',
    page_title: jobData ? `${jobData.title} at ${jobData.company} - JobTello.Co` : 'Job Details - JobTello.Co',
    page_location: window.location.href,
    job_id: jobData?.id,
    job_title: jobData?.title,
    job_company: jobData?.company,
    job_category: jobData?.category,
    job_location: jobData?.location
  })
}

const trackJobDetailView = (jobData: Job) => {
  pushToDataLayer({
    event: 'job_detail_view',
    job_id: jobData.id,
    job_title: jobData.title,
    job_company: jobData.company,
    job_category: jobData.category,
    job_location: jobData.location
  })
}

const trackButtonClick = (buttonName: string, jobData?: Job) => {
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    job_id: jobData?.id,
    job_title: jobData?.title,
    job_company: jobData?.company
  })
}


const route = useRoute()
const jobsStore = useJobsStore()

const jobId = computed(() => parseInt(route.params.id as string))

useHead({
  title: computed(() => {
    const currentJob = jobsStore.getJobById(jobId.value)
    return currentJob ? `${currentJob.title} at ${currentJob.company} - JobTello.Co` : 'Job Details - JobTello.Co'
  }),
  meta: computed(() => {
    const currentJob = jobsStore.getJobById(jobId.value)
    return [
      {
        name: 'description',
        content: currentJob
          ? `Find your dream job at JobTello.Co! ${currentJob.title} position at ${currentJob.company} in ${currentJob.location}. ${currentJob.category} role. Apply now and take the next step in your career!`
          : 'JobTello.Co - View detailed job information and apply for your dream position. Find your perfect career opportunity today.'
      },
      {
        name: 'keywords',
        content: currentJob
          ? `JobTello, ${currentJob.title}, ${currentJob.company}, ${currentJob.location}, ${currentJob.category}, jobs, careers, dream job, employment`
          : 'JobTello, job details, careers, employment, dream job'
      },
      {
        property: 'og:title',
        content: currentJob ? `${currentJob.title} at ${currentJob.company} - JobTello.Co` : 'Job Details - JobTello.Co'
      },
      {
        property: 'og:description',
        content: currentJob
          ? `Find your dream job at JobTello.Co! ${currentJob.title} position at ${currentJob.company} in ${currentJob.location}. ${currentJob.category} role.`
          : 'JobTello.Co - View detailed job information and apply for your dream position.'
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: 'JobTello.Co' }
    ]
  })
})

const job = computed(() => {
  return jobsStore.getJobById(jobId.value)
})

const similarJobs = computed(() => {
  if (!job.value) return []

  return jobsStore.jobs
    .filter(j => j.id !== job.value!.id && j.category === job.value!.category)
    .slice(0, 3)
})

onMounted(async () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = []
  }
  await jobsStore.fetchJobs()
  trackPageView()
  if (job.value) {
    trackJobDetailView(job.value)
  }
})
</script>


<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <header class="bg-primary text-primary-content">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center gap-4">
          <router-link to="/" class="btn btn-ghost btn-circle">
            <LucideArrowLeft class="h-6 w-6" />
          </router-link>
          <div>
            <h1 class="text-2xl font-bold">Job Details</h1>
            <p class="opacity-90">Complete job information</p>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div v-if="jobsStore.loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <div v-else-if="!job" class="text-center py-12">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-2xl font-bold mb-2">Job Not Found</h2>
        <p class="text-base-content/70 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <router-link to="/" class="btn btn-primary">
          Back to Jobs
        </router-link>
      </div>

      <div v-else class="max-w-4xl mx-auto">
        <JobDetailCard :job="job" @button-click="trackButtonClick" />

        <div class="mt-12">
          <h3 class="text-2xl font-bold mb-6">Similar Jobs</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <JobCard v-for="similarJob in similarJobs" :key="similarJob.id" :job="similarJob" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
