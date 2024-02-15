<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const { surveyPageLabels } = useI18n();

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
        <AppHeading :title="surveyPageLabels.title" :description="surveyPageLabels.description" />
      </template>

      <template #content>
        <section>
          <SurveyForm />
        </section>
      </template>
    </MainSection>
  </main>
</template>
