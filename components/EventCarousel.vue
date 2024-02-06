<script setup lang="ts">
const { events } = defineProps<{
  events: Evento[] | null | any;
}>();
</script>

<template>
  <UCarousel
    :items="events"
    v-slot="{ item }"
    :ui="{ item: 'basis-full' }"
    class="rounded-xl overflow-hidden"
    arrows
    indicators
  >
    <img :src="item.cover" class="w-full h-[35rem] object-cover" draggable="false" />
  </UCarousel>
</template>
