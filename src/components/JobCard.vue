<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Job } from '@/stores/jobs'

const LucideMapPin = defineAsyncComponent(() => import('@/components/Icons/LucideMapPin.vue'))

interface Props {
  job: Job
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="card-body">
      <h2 class="card-title text-lg font-bold">
        {{ job.title }}
      </h2>
      <p class="text-primary font-medium mb-2">
        {{ job.company }}
      </p>
      <div class="flex flex-wrap gap-2 mb-3">
        <div class="badge badge-outline">
          <LucideMapPin class="h-3 w-3 mr-1" />
          {{ job.location }}
        </div>
        <div class="badge badge-secondary">
          {{ job.category }}
        </div>
      </div>
      <p class="text-base-content/70 text-sm mb-4 line-clamp-3">
        {{ job.description }}
      </p>
      <div class="text-xs text-base-content/50 mb-4">
        Posted: {{ formatDate(job.postedAt) }}
      </div>
      <div class="card-actions justify-end">
        <router-link :to="{ name: 'job-detail', params: { id: job.id } }" class="btn btn-primary btn-sm">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>