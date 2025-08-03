<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const PageHeader = defineAsyncComponent(() => import('@/components/PageHeader.vue'))
const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))
</script>

<template>
  <div id="app" class="min-h-screen bg-base-200 flex flex-col">
    <PageHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <PageFooter />
  </div>
</template>
