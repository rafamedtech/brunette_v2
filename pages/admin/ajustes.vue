<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const columns = ref(1);

onMounted(() => {
  isLoading.value = false;
});

useHead({
  title: "Ajustes",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading title="Ajustes" />
      </template>

      <template #content>
        <section class="mx-auto flex max-w-xl flex-col gap-4">
          <UCard :ui="{ body: { base: 'h-full' } }">
            <template #header>
              <h3 class="text-lg font-bold">General</h3>
            </template>
            <div>
              <UFormGroup
                label="Platillos por fila"
                :ui="{ label: { base: 'text-primary dark:text-primary' } }"
              >
                <USelectMenu :options="[1, 2]" v-model="columns" />
              </UFormGroup>
            </div>
          </UCard>
          <UCard :ui="{ body: { base: 'h-full' } }">
            <template #header>
              <section class="flex justify-between">
                <h3 class="text-lg font-bold">Menú</h3>
                <UButton
                  to="/menu"
                  label="Ver menú"
                  trailing-icon="i-heroicons-rocket-launch"
                />
              </section>
            </template>
            <div>
              <UFormGroup
                label="Platillos por fila"
                :ui="{ label: { base: 'text-primary dark:text-primary' } }"
              >
                <USelectMenu :options="[1, 2]" v-model="columns" />
              </UFormGroup>
            </div>
          </UCard>
        </section>
      </template>
    </MainSection>
  </main>
</template>
