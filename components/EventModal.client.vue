<script setup lang="ts">
const store = useMainStore();
const { eventModal } = storeToRefs(store);

const image =
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706125314/events/superbowl_vbcqdu.jpg';
</script>

<template>
  <UModal
    v-model="eventModal"
    prevent-close
    :ui="{
      wrapper: 'z-[999999]',
      overlay: { background: 'bg-dark-medium/75 dark:bg-dark-medium/75' },
      rounded: 'rounded-xl',
    }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        background: ' dark:bg-dark-strong',
        rounded: 'rounded-xl',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg">Evento destacado</h2>
          <UButton
            label="Ir al menú"
            color="primary"
            icon="i-heroicons-arrow-left-on-rectangle-solid"
            size="md"
            class="-my-1"
            @click="eventModal = false"
          />
        </div>
      </template>

      <img :src="image" alt="" class="rounded-xl" />
    </UCard>
  </UModal>
</template>
