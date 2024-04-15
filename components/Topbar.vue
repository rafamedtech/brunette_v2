<script setup lang="ts">
import { LogoutModal } from "#components";
const { admin = false } = defineProps<{
  admin?: boolean;
}>();

// const user = useSupabaseUser();
// const store = useStore();
// const { language } = storeToRefs(store);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() =>
  isDark.value ? "i-heroicons-sun-solid" : "i-heroicons-moon-solid",
);

// const { changeLanguage } = useI18n();
const modal = useModal();
function toggleLogout() {
  modal.open(LogoutModal, {});
}
</script>

<template>
  <div
    class="sticky top-0 z-[49] flex justify-between bg-dark-strong p-4 text-center shadow lg:hidden"
  >
    <!-- Logo on mobile -->
    <Logo />
    <span v-if="admin" class="text-primary font-bold">Administrador</span>

    <section class="flex items-center gap-2">
      <UButton
        icon="i-heroicons-arrow-left-on-rectangle-solid"
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
        @click="toggleLogout"
      />
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
