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
    <FullscreenEvents />

    <Loader v-if="loadingScreen" />
  </section>
</template>
