<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Job } from '@/stores/jobs'

const JobCard = defineAsyncComponent(() => import('./JobCard.vue'))
const LucideAlertCircle = defineAsyncComponent(() => import('./Icons/LucideAlertCircle.vue'))

interface Props {
  jobs: Job[]
  loading: boolean
  error: string | null
}

defineProps<Props>()
</script>

<template>
  <div>
    <div v-if="loading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="error" class="alert alert-error mb-8">
      <LucideAlertCircle class="stroke-current shrink-0 h-6 w-6" />
      <span>{{ error }}</span>
    </div>
    <div v-else>
      <div class="mb-6">
        <p class="text-lg font-medium">
          {{ jobs.length }} job{{ jobs.length !== 1 ? 's' : '' }} found
        </p>
      </div>

      <div v-if="jobs.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold mb-2">No jobs found</h3>
        <p class="text-base-content/70">Try adjusting your search criteria</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </div>
  </div>
</template>