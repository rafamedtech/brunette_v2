<script setup lang="ts">
import { waitersList } from '@/utils/surveyInfo';
import type { FormError, FormSubmitEvent } from '#ui/types';

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state) errors.push({ path: 'email', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  return errors;
};

const store = useStore();
const { openModal } = storeToRefs(store);

const { surveyData, getQuestions, questions } = useSurvey();
await getQuestions();

const loadingBtn = ref(false);
async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data

  loadingBtn.value = true;

  setTimeout(() => {
    console.log({ ...event.data, questions: questions.value });
    openModal.value = true;
    loadingBtn.value = false;
  }, 1000);
}

const ratings = ['1', '2', '3', '4', '5'];

const isLoading = ref(false);

async function sendSurvey(survey: any) {
  try {
    await $fetch(`/api/survey`, {
      method: 'POST',
      body: { survey },
    });
  } catch (error) {
    console.error(error);
  }
}

async function formSubmit() {
  isLoading.value = true;

  await sendSurvey(surveyData);

  setTimeout(() => {
    isLoading.value = false;
    openModal.value = true;
  }, 1000);
}
</script>

<template>
  <UForm :state="surveyData" class="max-w-md mx-auto" @submit="onSubmit">
    <article class="flex flex-col gap-4">
      <BaseInput label="Tu nombre (opcional)" v-model="surveyData.name" />
      <BaseInput label="Correo electrónico" v-model="surveyData.email" isrequired />
      <BaseSelect label="Mesero que le atendió" :items="waitersList" v-model="surveyData.waiter" />
    </article>

    <section class="my-12 flex flex-col gap-4">
      <article
        v-for="question in questions"
        class="flex flex-col md:flex-row md:gap-2 md:items-center border-b border-gray-300 dark:border-gray-600 pb-6"
      >
        <h3 class="flex-1">{{ question.text }}</h3>
        <div class="flex items-center gap-2 justify-center">
          <BaseSelect :items="ratings" v-model="question.rating" />
          <Icon name="i-heroicons-star" size="32" class="text-primary" />
        </div>
      </article>
    </section>

    <BaseTextarea label="Comentarios" v-model="surveyData.comments" />

    <UButton
      :loading="loadingBtn"
      class="mx-auto mt-8"
      size="lg"
      :label="loadingBtn ? 'Enviando' : 'Enviar'"
      type="submit"
    />
  </UForm>
</template>
