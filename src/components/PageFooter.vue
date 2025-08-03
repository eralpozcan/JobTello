<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'

const LucideTwitter = defineAsyncComponent(() => import('@/components/Icons/LucideTwitter.vue'))
const LucideYoutube = defineAsyncComponent(() => import('@/components/Icons/LucideYoutube.vue'))
const LucideFacebook = defineAsyncComponent(() => import('@/components/Icons/LucideFacebook.vue'))

const navigationLinks = ref([
  { name: 'About us', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Press kit', href: '#' }
])
</script>

<template>
  <footer class="footer footer-center p-10 bg-base-300 text-base-content" role="contentinfo">
    <div>
      <!-- Navigation Links -->
      <nav aria-label="Footer navigation">
        <div class="grid grid-flow-col gap-4">
          <a v-for="link in navigationLinks" :key="link.name" :href="link.href"
            class="link link-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-300 rounded"
            :aria-label="`Navigate to ${link.name} page`">
            {{ link.name }}
          </a>
        </div>
      </nav>

      <!-- Social Media Links -->
      <nav aria-label="Social media links">
        <div class="grid grid-flow-col gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
            class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-300"
            aria-label="Follow us on Twitter (opens in new tab)">
            <LucideTwitter class="w-6 h-6" aria-hidden="true" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
            class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-300"
            aria-label="Subscribe to our YouTube channel (opens in new tab)">
            <LucideYoutube class="w-6 h-6" aria-hidden="true" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
            class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-300"
            aria-label="Like us on Facebook (opens in new tab)">
            <LucideFacebook class="w-6 h-6" aria-hidden="true" />
          </a>
        </div>
      </nav>

      <!-- Copyright -->
      <div>
        <p class="text-sm" role="contentinfo">
          <span aria-label="Copyright information">Copyright © 2025 - All rights reserved by JobTello.Co</span>
        </p>
      </div>
    </div>
  </footer>
</template>
