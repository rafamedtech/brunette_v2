<script setup lang="ts">
import { waitersList } from '@/utils/surveyInfo';

const store = useMainStore();
const { openModal } = storeToRefs(store);

const { surveyData, getQuestions, questions } = useSurvey();
await getQuestions();

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
  <form class="flex flex-col dark:text-gray-100 max-w-md mx-auto" @submit.prevent="formSubmit">
    <article class="flex flex-col gap-4">
      <BaseInput label="Tu nombre (opcional)" v-model="surveyData.name" />
      <BaseInput label="Correo electrónico" v-model="surveyData.email" isrequired />
      <BaseSelect label="Mesero que le atendió" :items="waitersList" v-model="surveyData.waiter" />
    </article>

    <section class="my-8 flex flex-col gap-4">
      <article v-for="question in questions" class="flex flex-col border-b pb-6">
        <h3 class="flex-1">{{ question.text }}</h3>
        <div class="flex items-center gap-2 justify-center">
          <BaseSelect :items="ratings" v-model="question.rating" />
          <Icon name="i-heroicons-star" size="32" class="text-primary" />
          <!-- <Icon name="i-heroicons-arrow-small-down" /> -->
        </div>
      </article>
    </section>

    <BaseTextarea label="Comentarios" v-model="surveyData.comments" />

    <UButton :loading="isLoading" class="mx-auto mt-8" size="lg" label="Enviar" />
  </form>
</template>
