<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const SearchInput = defineAsyncComponent(() => import('./SearchInput.vue'))
const SelectInput = defineAsyncComponent(() => import('./SelectInput.vue'))
const LucideX = defineAsyncComponent(() => import('@/components/Icons/LucideX.vue'))

interface Props {
  searchQuery: string
  selectedLocation: string
  selectedCategory: string
  locations: string[]
  categories: string[]
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedLocation', value: string): void
  (e: 'update:selectedCategory', value: string): void
  (e: 'clearFilters'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="bg-gradient-to-r from-base-200 to-base-300 rounded-xl p-6 mb-8 shadow-lg border border-base-300">
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-base-content mb-1">Filter Jobs</h2>
      <p class="text-sm text-base-content/70">Find your perfect job by filtering through our opportunities</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
      <div class="sm:col-span-2 lg:col-span-1">
        <SearchInput :model-value="searchQuery" @update:model-value="$emit('update:searchQuery', $event)"
          placeholder="Job title or company..." label="Search Jobs" :debounce-ms="500" />
      </div>

      <div>
        <SelectInput :model-value="selectedLocation" @update:model-value="$emit('update:selectedLocation', $event)"
          label="Location" placeholder="All Locations" :options="locations" />
      </div>

      <div>
        <SelectInput :model-value="selectedCategory" @update:model-value="$emit('update:selectedCategory', $event)"
          label="Category" placeholder="All Categories" :options="categories" />
      </div>

      <div class="form-control">
        <button
          class="btn btn-outline btn-primary hover:btn-primary hover:text-primary-content transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-200"
          @click="$emit('clearFilters')" :disabled="!searchQuery && !selectedLocation && !selectedCategory">
          <LucideX class="h-4 w-4 mr-2" />
          Clear Filters
        </button>
      </div>
    </div>

    <div v-if="searchQuery || selectedLocation || selectedCategory" class="mt-4 pt-4 border-t border-base-content/10">
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-sm font-medium text-base-content/70">Active filters:</span>

        <div v-if="searchQuery" class="badge badge-primary gap-1">
          <span>{{ searchQuery }}</span>
          <button @click="$emit('update:searchQuery', '')"
            class="btn btn-ghost btn-xs p-0 h-4 w-4 min-h-0 hover:bg-primary-focus" aria-label="Remove search filter">
            <LucideX class="h-3 w-3" />
          </button>
        </div>

        <div v-if="selectedLocation" class="badge badge-secondary gap-1">
          <span>{{ selectedLocation }}</span>
          <button @click="$emit('update:selectedLocation', '')"
            class="btn btn-ghost btn-xs p-0 h-4 w-4 min-h-0 hover:bg-secondary-focus"
            aria-label="Remove location filter">
            <LucideX class="h-3 w-3" />
          </button>
        </div>

        <div v-if="selectedCategory" class="badge badge-accent gap-1">
          <span>{{ selectedCategory }}</span>
          <button @click="$emit('update:selectedCategory', '')"
            class="btn btn-ghost btn-xs p-0 h-4 w-4 min-h-0 hover:bg-accent-focus" aria-label="Remove category filter">
            <LucideX class="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>