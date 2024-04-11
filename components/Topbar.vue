<script setup lang="ts">
const store = useStore();
const { language } = storeToRefs(store);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() =>
  isDark.value ? "i-heroicons-sun-solid" : "i-heroicons-moon-solid",
);

// const darkModeText = computed(() => (isDark.value ? "Light" : "Dark"));

const { changeLanguage } = useI18n();
</script>

<template>
  <div
    class="sticky top-0 z-[999] flex justify-between bg-dark-strong p-4 text-center shadow lg:hidden"
  >
    <!-- Logo on mobile -->
    <Logo />

    <section class="flex items-center gap-2">
      <ClientOnly>
        <UButton
          :icon="darkModeIcon"
          variant="ghost"
          color="gray"
          size="xl"
          :ui="{
            inline: 'flex-col',
            rounded: 'rounded-xl',
            color: {
              gray: {
                ghost: 'text-gray-200 hover:text-gray-200 hover:bg-gray-800',
              },
            },
          }"
          class="flex-1"
          @click="toggleDark()"
        />
        <!-- <UButton
          :label="language === 'es' ? 'EN' : 'ES'"
          icon="i-heroicons-arrows-up-down-solid"
          variant="ghost"
          color="primary"
          :ui="{
            inline: 'flex-col',
            rounded: 'rounded-xl',
            color: { primary: { ghost: 'text-gray-200 hover:text-gray-200 hover:bg-gray-800' } },
          }"
          @click="changeLanguage"
        /> -->
      </ClientOnly>
    </section>
  </div>
</template>
