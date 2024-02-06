<script setup lang="ts">
import { sidebarLinks } from '@/utils/sidebarLinks';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeLabel = computed(() => {
  return isDark.value ? 'Light mode' : 'Dark mode';
});
const darkModeIcon = computed(() =>
  isDark.value ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'
);

const links = ref([
  [...sidebarLinks],
  [
    {
      label: darkModeLabel,
      icon: darkModeIcon,
      click: () => {
        toggleDark();
      },
    },
  ],
]);
</script>

<template>
  <section class="bg-dark-strong px-4 w-1/6 fixed min-h-screen">
    <article class="flex justify-center py-4 min-w-0">
      <Logo />
    </article>
    <ClientOnly>
      <UVerticalNavigation
        :links="links"
        :ui="{
          active: 'before:bg-gray-800 text-white',
          inactive: 'hover:text-white text-gray-400 hover:before:bg-gray-800/50',
          icon: { active: 'text-gray-200', inactive: 'text-gray-500' },
        }"
      />
    </ClientOnly>
  </section>
</template>
