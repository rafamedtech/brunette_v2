<script setup lang="ts">
const store = useStore();
const { openModal } = storeToRefs(store);

function closeModal() {
  openModal.value = false;
  return navigateTo('/menu');
}
</script>

<template>
  <UModal
    v-model="openModal"
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
          <h2 class="text-lg">Encuesta enviada!</h2>
          <UButton
            label="Ir al menú"
            color="primary"
            icon="i-heroicons-arrow-left-on-rectangle-solid"
            size="md"
            class="-my-1"
            @click="closeModal"
          />
        </div>
      </template>

      <h3 class="text-xl text-primary mb-2">Gracias por tus comentarios</h3>
      <p>Con tus comentarios podemos mejorar nuestros productos y servicios</p>
    </UCard>
  </UModal>
</template>
