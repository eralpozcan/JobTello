<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  label?: string
  debounceMs?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  label: 'Search',
  debounceMs: 300
})

const emit = defineEmits<Emits>()

const localValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

// Watch for local input changes and debounce them
watch(localValue, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit('update:modelValue', newValue)
  }, props.debounceMs)
})
</script>

<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </label>
    <input type="text" :placeholder="placeholder" class="input input-bordered w-full" v-model="localValue" />
  </div>
</template>