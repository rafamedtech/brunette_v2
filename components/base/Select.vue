<script setup lang="ts">
const { label, items } = defineProps<{
  label?: string;
  items: string[];
}>();

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="" class="dark:text-gray-100">{{ label }}</label>
    <USelect
      v-bind="$attrs"
      @input="$emit('update:modelValue', handleInputChange($event))"
      :options="items"
      size="md"
      color="gray"
      :ui="{ color: { gray: { outline: 'dark:bg-dark-strong' } } }"
    />
  </div>
</template>
