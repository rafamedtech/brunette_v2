<script setup lang="ts">
const store = useStore();
const { loadingScreen } = storeToRefs(store);
</script>

<template>
  <section>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Modal />
    <EventModal />
    <UModals />
    <UNotifications />

    <FullscreenEvents />

    <Loader v-if="loadingScreen" />
  </section>
</template>
