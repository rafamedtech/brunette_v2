<script setup lang="ts">
const { type = "text" } = defineProps<{
  type?: string;
  label?: string;
  placeholder?: string;
  isrequired?: boolean;
  modelValue?: string | number | Date | null | undefined;
}>();

const handleInputChange = (event: Event) =>
  (event.target as HTMLInputElement).value;
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="label" class="dark:text-gray-100"
      >{{ label }}<span v-if="isrequired" class="text-red-500">*</span></label
    >
    <UInput
      v-bind="$attrs"
      :value="modelValue"
      :id="label"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', handleInputChange($event))"
      :type="type"
      :required="isrequired"
      size="xl"
      color="gray"
      :ui="{ color: { gray: { outline: 'dark:bg-dark-strong' } } }"
    />
  </div>
</template>
