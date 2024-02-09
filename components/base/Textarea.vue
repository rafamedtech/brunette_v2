<script setup lang="ts">
defineProps<{
  label?: string;
  placeholder?: string;
  isrequired?: boolean;
  modelValue?: string | string[] | number | undefined;
}>();

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="label" class="dark:text-gray-100"
      >{{ label }}<span v-if="isrequired" class="text-red-500">*</span></label
    >
    <UTextarea
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', handleInputChange($event))"
      color="gray"
      :ui="{ color: { gray: { outline: 'dark:bg-dark-strong' } } }"
    />
  </div>
</template>
