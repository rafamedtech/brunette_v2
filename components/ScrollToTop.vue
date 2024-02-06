<script setup lang="ts">
const store = useMainStore();
const { showScrollToTop } = storeToRefs(store);

const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 150;
};
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <section
    class="fixed bottom-[5.5rem] lg:bottom-8 rounded-lg flex flex-row right-4 lg:right-8 shadow-md text-primary bg-primary"
  >
    <UButton
      v-if="showScrollToTop"
      label="Arriba"
      icon="i-heroicons-arrow-small-up"
      class="text-white"
      :ui="{ inline: 'flex-col' }"
      @click="scrollToTop"
    />
    <UButton
      label="Menu"
      icon="i-heroicons-arrow-small-left"
      class="text-white"
      @click="navigateTo('/menu')"
      :ui="{ inline: 'flex-col' }"
    />
  </section>
</template>
