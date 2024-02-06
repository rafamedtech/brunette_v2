<script setup lang="ts">
const { label } = defineProps<{
  label: string;
  index: number;
  modelValue?: number | undefined;
}>();

const ratings = [1, 2, 3, 4, 5];

const handleInputChange = (event: Event) => parseInt((event.target as HTMLInputElement).value);
</script>

<template>
  <div class="flex flex-col">
    <label>
      <span class="font-bold dark:text-gray-100"> {{ label }} </span>
      <!-- <span class="font-bold text-accent dark:text-primary"> {{ label }} </span> -->
    </label>

    <section class="mt-4">
      <URange v-model="modelValue" name="range" />
    </section>
  </div>
</template>
