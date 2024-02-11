<script setup lang="ts">
const store = useStore();
const { language } = storeToRefs(store);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() =>
  isDark.value ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'
);

const darkModeText = computed(() => (isDark.value ? 'Light' : 'Dark'));

function changeLanguage() {}
</script>

<template>
  <div
    class="p-4 flex shadow justify-between bg-dark-strong sticky top-0 text-center z-[999] lg:hidden"
  >
    <!-- Logo on mobile -->
    <Logo />

    <section class="flex items-center gap-2">
      <ClientOnly>
        <UButton
          :label="darkModeText"
          :icon="darkModeIcon"
          variant="solid"
          color="gray"
          :ui="{ inline: 'flex-col', rounded: 'rounded-xl' }"
          class="flex-1"
          @click="toggleDark()"
        />
        <UButton
          :label="language === 'es' ? 'English' : 'Español'"
          icon="i-heroicons-arrows-up-down-16-solid"
          variant="solid"
          :ui="{ inline: 'flex-col', rounded: 'rounded-xl' }"
          @click="changeLanguage"
        />
      </ClientOnly>
    </section>
  </div>
</template>
