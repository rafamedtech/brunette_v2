<script setup lang="ts">
const store = useStore();
const { language } = storeToRefs(store);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() =>
  isDark.value ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'
);

const darkModeText = computed(() => (isDark.value ? 'Light' : 'Dark'));

const { changeLanguage } = useI18n();
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
          variant="ghost"
          color="gray"
          :ui="{
            inline: 'flex-col',
            rounded: 'rounded-xl',
            color: { gray: { ghost: 'text-gray-200 hover:text-gray-200 hover:bg-gray-800' } },
          }"
          class="flex-1"
          @click="toggleDark()"
        />
        <UButton
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
        />
      </ClientOnly>
    </section>
  </div>
</template>
