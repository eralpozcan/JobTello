<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  placeholder: string
  options: string[]
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </label>
    <select class="select select-bordered w-full" :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
