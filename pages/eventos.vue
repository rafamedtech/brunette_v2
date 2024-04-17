<script setup lang="ts">
import { EventDetails } from "#components";
import { allEvents } from "@/sanity/queries";

const store = useStore();
const { isLoading, fullscreenEvents } = storeToRefs(store);

const { data: events } = useSanityQuery<Evento[]>(allEvents);

const { eventsPageLabels } = useI18n();

const modal = useModal();
function openDetails(event: Evento) {
  modal.open(EventDetails, { event });
}

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
    <MainSection :loading="isLoading" padded>
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
          <!-- <EventCarousel :events="events" /> -->

          <section class="grid grid-cols-2 gap-4">
            <UCard
              v-for="event in events"
              :key="event._id"
              class="rounded-xl"
              :ui="{ body: { padding: '' } }"
              @click="openDetails(event)"
            >
              <img
                :src="event.cover"
                :alt="event.name"
                class="h-64 w-full rounded-xl object-cover"
              />
            </UCard>
          </section>
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
