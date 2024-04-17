<script setup lang="ts">
const { event } = defineProps<{
  event: Evento;
}>();

const modal = useModal();
</script>

<template>
  <UModal
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
          <h2 class="text-lg">{{ event.name }}</h2>
          <UButton
            label="Cerrar"
            color="primary"
            icon="i-heroicons-arrow-left-on-rectangle-solid"
            size="md"
            class="-my-1"
            @click="modal.close()"
          />
        </div>
      </template>

      <img :src="event.cover" alt="" class="mx-auto h-full w-80 rounded-xl" />

      <template #footer>
        <p>{{ event.description }}</p>
      </template>
    </UCard>
  </UModal>
</template>
