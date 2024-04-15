<script setup lang="ts">
import { allEvents } from "@/sanity/queries";

const store = useStore();
const { isLoading, fullscreenEvents } = storeToRefs(store);

const { data: events } = useSanityQuery<Evento[]>(allEvents);

const { eventsPageLabels } = useI18n();

onMounted(() => {
  isLoading.value = false;
});

useHead({
  title: eventsPageLabels.value.title,
  meta: [
    {
      name: "description",
      content: eventsPageLabels.value.description,
    },
  ],
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading
          :title="eventsPageLabels.title"
          :description="eventsPageLabels.description"
        />
      </template>

      <template #content>
        <!-- Events on mobile -->
        <section class="flex flex-col gap-8 px-4 md:hidden">
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
          class="container hidden max-w-full pb-8 md:grid md:grid-cols-3 md:gap-4 lg:gap-8"
        >
          <EventCard v-for="event in events" :key="event._id" :event="event" />
        </section>
      </template>
    </MainSection>
  </main>
</template>
