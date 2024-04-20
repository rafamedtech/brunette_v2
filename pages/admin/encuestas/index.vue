<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const { surveys, getSurveys, getGlobalRating } = useSurvey();

const paginatedSurveys = computed(() =>
  surveys.value.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value,
  ),
);

await getSurveys();

const newSurveys = computed(
  () => surveys.value.filter((survey) => survey.new).length,
);

const pageTotal = computed(() => surveys.value.length);

// Pagination
const page = ref(1);
watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const pageCount = ref(10);
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value),
);

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
  <main>
    <MainSection :loading="isLoading" padded>
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
                <section class="flex justify-around">
                  <div class="flex flex-col items-center">
                    <h4 class="text-primary text-xl font-bold">Total</h4>
                    <div class="text-lg">{{ surveys.length }}</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <h4 class="text-primary text-xl font-bold">Sin leer</h4>
                    <div class="text-lg">{{ newSurveys }}</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <h4 class="text-primary text-xl font-bold">Rating</h4>
                    <div
                      class="text-lg"
                      :class="{
                        'text-primary font-bold': getGlobalRating === 5,
                      }"
                    >
                      {{ getGlobalRating.toFixed(2) }}
                    </div>
                  </div>
                </section>
              </template>
              <SurveysTable :surveys="paginatedSurveys" />

              <template #footer>
                <div
                  class="flex flex-wrap items-center justify-center gap-2 md:justify-between"
                  v-if="pageTotal > 0"
                >
                  <div>
                    <span class="text-sm leading-5">
                      Mostrando
                      <span class="font-medium">{{ pageFrom }}</span>
                      al
                      <span class="font-medium">{{ pageTo }}</span>
                      de
                      <span class="font-medium">{{ pageTotal }}</span>
                      resultados
                    </span>
                  </div>

                  <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="pageTotal"
                    :ui="{
                      wrapper: 'flex items-center',
                    }"
                  />
                </div>
              </template>
            </UCard>
          </section>
        </section>
      </template>
    </MainSection>
  </main>
</template>
