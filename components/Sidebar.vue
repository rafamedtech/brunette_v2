<script setup lang="ts">
const { changeLanguage, navLinksLabels } = useI18n();
const store = useStore();
const { language } = storeToRefs(store);

const isDark = useDark();
const toggleDark = useToggle(isDark);
const darkModeLabel = computed(() => {
  return isDark.value ? "Light mode" : "Dark mode";
});
const darkModeIcon = computed(() =>
  isDark.value ? "i-heroicons-sun-solid" : "i-heroicons-moon-solid",
);

const changeLanguageBtn = computed(() => {
  return language.value === "es" ? "English" : "Español";
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
        icon: "i-heroicons-arrows-up-down-solid",
        click: () => {
          changeLanguage();
        },
      },
    ],
  ];
});
</script>

<template>
  <section class="fixed min-h-screen w-1/6 bg-dark-strong px-4">
    <article class="flex min-w-0 justify-center py-4">
      <Logo />
    </article>
    <ClientOnly>
      <UVerticalNavigation
        :links="links"
        :ui="{
          active:
            'before:bg-gray-800 text-primary dark:text-primary border border-primary',
          inactive:
            'hover:text-white text-gray-400 hover:before:bg-gray-800/50 border border-transparent',
          icon: {
            active: 'text-primary dark:text-primary',
            inactive: '',
          },
        }"
      />
    </ClientOnly>
  </section>
</template>
