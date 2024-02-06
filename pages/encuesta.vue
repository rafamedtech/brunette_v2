<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
const store = useMainStore();
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
