<script setup lang="ts">
const { changeLanguage, navLinksLabels } = useI18n();
const store = useStore();
const { language } = storeToRefs(store);

const isDark = useDark();
const toggleDark = useToggle(isDark);
const darkModeLabel = computed(() => {
  return isDark.value ? 'Light mode' : 'Dark mode';
});
const darkModeIcon = computed(() =>
  isDark.value ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'
);

const changeLanguageBtn = computed(() => {
  return language.value === 'es' ? 'English' : 'Español';
});

const links = computed<any>(() => {
  return [
    navLinksLabels.value,
    [
      {
        label: darkModeLabel.value,
        icon: darkModeIcon.value,
        click: () => {
          toggleDark();
        },
      },
      {
        label: changeLanguageBtn.value,
        icon: 'i-heroicons-arrows-up-down-solid',
        click: () => {
          changeLanguage();
        },
      },
    ],
  ];
});
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
