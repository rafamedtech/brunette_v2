<script setup lang="ts">
const { label, items } = defineProps<{
  label?: string;
  items: string[];
}>();

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="" class="dark:text-base-100">{{ label }}</label>
    <USelect
      v-bind="$attrs"
      @input="$emit('update:modelValue', handleInputChange($event))"
      :options="items"
      size="md"
    />
  </div>
</template>
