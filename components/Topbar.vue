<script setup lang="ts">
const store = useMainStore();
const { language } = storeToRefs(store);

function changeLanguage() {}
</script>

<template>
  <div
    class="p-4 flex shadow justify-between bg-dark-strong sticky top-0 text-center z-[999] lg:hidden"
  >
    <!-- Logo on mobile -->
    <Logo />

    <section class="flex items-center gap-2">
      <DarkLightBtn mobile />
      <UButton
        variant="outline"
        icon="i-heroicons-arrows-up-down-16-solid"
        :label="language === 'es' ? 'EN' : 'ES'"
        @click="changeLanguage"
      />
    </section>
  </div>
</template>
