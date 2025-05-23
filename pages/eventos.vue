<script setup lang="ts">
import { EventModal } from "#components";
import { allEvents } from "@/sanity/queries";

const modal = useModal();
const store = useStore();
const { isLoading } = storeToRefs(store);

const { data: events } = useSanityQuery<Evento[]>(allEvents);
const { eventsPageLabels } = useI18n();

const openDetails = (event: Evento) => modal.open(EventModal, { event });
const openGallery = (events: Evento[] | null) =>
  modal.open(EventModal, { events });

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
  <MainSection :loading="isLoading" padded>
    <template #heading>
      <AppHeading
        :title="eventsPageLabels.title"
        :description="eventsPageLabels.description"
      />
    </template>

    <template #content>
      <!-- Events on mobile -->
      <section class="flex flex-col gap-8 px-4">
        <UButton
          :label="eventsPageLabels.fullscreenButton"
          icon="i-heroicons-arrows-pointing-out"
          class="mx-auto"
          @click="openGallery(events)"
        />

        <section class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
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
              class="h-64 w-full cursor-pointer rounded-xl object-cover md:h-full"
            />
          </UCard>
        </section>
      </section>
    </template>
  </MainSection>
</template>
