<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { Job } from '@/stores/jobs'

const LucideMapPin = defineAsyncComponent(() => import('@/components/Icons/LucideMapPin.vue'))
const LucideCalendar = defineAsyncComponent(() => import('@/components/Icons/LucideCalendar.vue'))
const LucideFileText = defineAsyncComponent(() => import('@/components/Icons/LucideFileText.vue'))
const LucideHeart = defineAsyncComponent(() => import('@/components/Icons/LucideHeart.vue'))
const LucideShare = defineAsyncComponent(() => import('@/components/Icons/LucideShare.vue'))

interface Props {
  job: Job
}

interface Emits {
  buttonClick: [buttonName: string, job: Job]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isSharing = ref(false)
const shareSuccess = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareJob = async () => {
  try {
    isSharing.value = true
    const currentUrl = window.location.href
    
    await navigator.clipboard.writeText(currentUrl)
    
    shareSuccess.value = true
    emit('buttonClick', 'share_job', props.job)
    
    // Reset success state after 2 seconds
    setTimeout(() => {
      shareSuccess.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy URL:', error)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    shareSuccess.value = true
    emit('buttonClick', 'share_job', props.job)
    
    setTimeout(() => {
      shareSuccess.value = false
    }, 2000)
  } finally {
    isSharing.value = false
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ job.title }}</h1>
        <h2 class="text-xl text-primary font-semibold mb-4">{{ job.company }}</h2>

        <div class="flex flex-wrap gap-3 mb-4">
          <div class="badge badge-lg badge-outline">
            <LucideMapPin class="h-4 w-4 mr-2" />
            {{ job.location }}
          </div>
          <div class="badge badge-lg badge-secondary">
            {{ job.category }}
          </div>
          <div class="badge badge-lg badge-accent">
            <LucideCalendar class="h-4 w-4 mr-2" />
            Posted: {{ formatDate(job.postedAt) }}
          </div>
        </div>
      </div>
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Job Description</h3>
        <div class="prose max-w-none">
          <p class="text-base-content/80 leading-relaxed">{{ job.description }}</p>
        </div>
      </div>
      <div class="card-actions justify-center gap-4">
        <button class="btn btn-primary btn-lg" @click="$emit('buttonClick', 'apply_now', job)">
          <LucideFileText class="h-5 w-5 mr-2" />
          Apply Now
        </button>
        <button class="btn btn-outline btn-lg" @click="$emit('buttonClick', 'save_job', job)">
          <LucideHeart class="h-5 w-5 mr-2" />
          Save Job
        </button>
        <button 
          class="btn btn-lg" 
          :class="shareSuccess ? 'btn-success' : 'btn-ghost'"
          @click="shareJob"
          :disabled="isSharing"
        >
          <span v-if="isSharing" class="loading loading-spinner loading-sm mr-2"></span>
          <LucideShare v-else class="h-5 w-5 mr-2" />
          {{ shareSuccess ? 'Link Copied!' : isSharing ? 'Copying...' : 'Share' }}
        </button>
      </div>
    </div>
  </div>
</template>