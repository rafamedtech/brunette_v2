<script setup lang="ts">
import { allEvents } from '@/sanity/queries';
const store = useStore();
const { fullscreenEvents } = storeToRefs(store);
// const fullscreenEvents = ref(true);

const { data: events } = await useSanityQuery<Evento[]>(allEvents);
</script>

<template>
  <UModal
    v-model="fullscreenEvents"
    prevent-close
    :ui="{
      wrapper: 'z-[999999]',
      overlay: { background: 'bg-dark-medium/75 dark:bg-dark-medium/75' },
      container: 'items-center max-w-sm mx-auto',
      rounded: 'rounded-xl',
    }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        background: ' dark:bg-dark-strong',
        rounded: 'rounded-xl',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg">Eventos</h2>
          <UButton
            label="Regresar"
            color="primary"
            icon="i-heroicons-arrows-pointing-in"
            size="md"
            class="-my-1"
            @click="fullscreenEvents = false"
          />
        </div>
      </template>

      <EventCarousel :events="events" />
    </UCard>
  </UModal>
</template>
