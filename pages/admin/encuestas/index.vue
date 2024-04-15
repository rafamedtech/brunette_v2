<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const { surveys, getSurveys, getGlobalRating } = useSurvey();

await getSurveys();

onMounted(() => {
  isLoading.value = false;
});

useHead({
  title: "Encuestas",
  meta: [
    {
      name: "description",
      content: "Encuestas de satisfacción de los clientes.",
    },
  ],
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<template>
  <main class="relative">
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading
          title="Encuestas"
          description="Encuestas de satisfacción de los clientes."
        />
      </template>

      <template #content>
        <section class="mx-auto flex max-w-xl flex-col gap-4">
          <section>
            <UCard>
              <template #header>
                <h2 class="text-primary font-bold">Todas las encuestas</h2>
              </template>
              <section class="flex justify-around">
                <div class="flex flex-col items-center">
                  <h4 class="text-xl font-bold">Total</h4>
                  <div class="text-lg">{{ surveys.length }}</div>
                </div>
                <div class="flex flex-col items-center">
                  <h4 class="text-xl font-bold">Sin leer</h4>
                  <div class="text-lg">{{ surveys.length }}</div>
                </div>
                <div class="flex flex-col items-center">
                  <h4 class="text-xl font-bold">Rating</h4>
                  <div
                    class="text-lg"
                    :class="{ 'text-primary font-bold': getGlobalRating === 5 }"
                  >
                    {{ getGlobalRating.toFixed(2) }}
                  </div>
                </div>
              </section>
            </UCard>
          </section>
          <!-- <div class="flex items-center justify-between px-8 font-bold">
            <h4>Mesero</h4>
            <h4>Fecha</h4>
          </div>
          <NuxtLink
            v-for="{ id, waiter, createdAt } in surveys"
            :to="`/admin/encuestas/${id}`"
          >
            <UCard>
              <section class="flex justify-between">
                <h3>{{ waiter }}</h3>
                <span class="text-primary">{{ fortmatDate(createdAt) }}</span>
              </section>
            </UCard>
          </NuxtLink> -->

          <SurveysTable :surveys="surveys" />
        </section>
      </template>
    </MainSection>
  </main>
</template>
