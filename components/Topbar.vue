<script setup lang="ts">
import { LogoutModal } from "#components";
const { admin = false } = defineProps<{
  admin?: boolean;
}>();

const user = useSupabaseUser();
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

const items = computed<any>(() => {
  return [
    [
      {
        label: "Ver menú",
        icon: "i-heroicons-clipboard-document-list-solid",
        to: "/menu",
      },
      {
        label: "Encuestas",
        icon: "i-heroicons-clipboard-document-check-solid",
        to: "/admin/encuestas",
      },
      {
        label: "Cerrar sesión",
        icon: "i-heroicons-arrow-left-end-on-rectangle",
        click: () => {
          toggleLogout();
        },
      },
      // {
      //   label: "",
      //   icon: darkModeIcon.value,
      //   click: () => {
      //     toggleDark();
      //   },
      // },
      {
        label: "¿Necesitas ayuda?",
        icon: "i-heroicons-question-mark-circle",
        click: () => {
          // toggleFeedback();
        },
      },
    ],
  ];
});
</script>

<template>
  <div
    class="sticky top-0 z-[49] flex justify-between bg-dark-strong p-4 text-center shadow lg:hidden"
  >
    <!-- Logo on mobile -->
    <Logo />
    <span v-if="admin" class="text-primary font-bold">Administrador</span>

    <section class="flex items-center gap-2">
      <!-- <UButton
        v-if="user"
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
      /> -->
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
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-start' }"
        v-if="user"
      >
        <UButton
          color="gray"
          trailing-icon="i-heroicons-bars-3-bottom-right"
          class="h-fit"
          variant="ghost"
          :ui="{
            inline: 'flex-col',
            rounded: 'rounded-xl',
            color: {
              gray: {
                ghost: 'text-gray-200 hover:text-gray-200 hover:bg-gray-800',
              },
            },
          }"
        />
      </UDropdown>
    </section>
  </div>
</template>
