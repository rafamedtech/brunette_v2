<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

onMounted(() => {
  isLoading.value = false;
});

const { getQuestions } = useSurvey();
await getQuestions();
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading title="Encuesta de satisfacción" description="Agradecemos su opinión" />
      </template>

      <template #content>
        <section>
          <SurveyForm />
        </section>
      </template>
    </MainSection>
  </main>
</template>
