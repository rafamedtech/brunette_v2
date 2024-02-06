<script setup lang="ts">
interface Props {
  loading: boolean;
}

defineProps<Props>();
</script>

<template>
  <section class="min-h-screen w-full">
    <section class="lg:pt-8 pt-4">
      <slot name="heading"></slot>
    </section>

    <div v-if="loading" class="w-full flex justify-center h-[70vh] items-center">
      <Icon name="icon-park-outline:loading-four" size="48" class="animate-spin" />
    </div>

    <section class="pb-24 pt-4" v-else>
      <slot name="content"></slot>
    </section>
  </section>
</template>
