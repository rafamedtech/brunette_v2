<script setup lang="ts">
import { allEvents } from '@/sanity/queries';

const store = useStore();
const { isLoading, fullscreenEvents } = storeToRefs(store);

const { data: events } = useSanityQuery<Evento[]>(allEvents);

const { eventsPageLabels } = useI18n();

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading :title="eventsPageLabels.title" :description="eventsPageLabels.description" />
      </template>

      <template #content>
        <!-- Events on mobile -->
        <section class="md:hidden flex flex-col gap-8 px-4">
          <UButton
            :label="eventsPageLabels.fullscreenButton"
            icon="i-heroicons-arrows-pointing-out"
            class="mx-auto"
            @click="fullscreenEvents = true"
          />
          <EventCarousel :events="events" />
        </section>

        <!-- Events on desktop -->
        <section
          class="container hidden lg:p-4 pb-8 md:grid gap-8 md:gap-2 md:grid-cols-2 lg:grid-cols-3 max-w-full"
        >
          <EventCard v-for="event in events" :key="event._id" :event="event" />
        </section>
      </template>
    </MainSection>
  </main>
</template>
