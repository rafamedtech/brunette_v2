<script setup lang="ts">
import { waitersList } from "@/utils/surveyInfo";
import type { FormError, FormSubmitEvent } from "#ui/types";

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

const store = useStore();
const { openModal } = storeToRefs(store);

const { surveyPageLabels } = useI18n();

const { surveyData, getQuestions, questions } = useSurvey();
await getQuestions();

const loadingBtn = ref(false);
async function onSubmit(event: FormSubmitEvent<any>) {
  loadingBtn.value = true;

  setTimeout(async () => {
    await sendSurvey(surveyData);
    openModal.value = true;
    loadingBtn.value = false;
  }, 1000);
}

const ratings = [1, 2, 3, 4, 5];
// const ratings = ["1", "2", "3", "4", "5"];

const isLoading = ref(false);

async function sendSurvey(survey: any) {
  try {
    await $fetch(`/api/survey`, {
      method: "POST",
      body: { survey },
    });
  } catch (error) {
    console.error(error);
  }
}

async function formSubmit() {
  // isLoading.value = true;

  await sendSurvey(surveyData);

  // setTimeout(() => {
  //   isLoading.value = false;
  //   openModal.value = true;
  // }, 1000);
}
</script>

<template>
  <UForm :state="surveyData" class="mx-auto max-w-md" @submit="onSubmit">
    <article class="flex flex-col gap-4">
      <BaseInput
        :label="surveyPageLabels.form.name"
        v-model="surveyData.name"
        placeholder="Escribe aquí"
      />
      <BaseInput
        :label="surveyPageLabels.form.email"
        v-model="surveyData.email"
        placeholder="ejemplo@correo.com"
      />
      <BaseSelect
        :label="surveyPageLabels.form.waiter"
        :items="waitersList"
        v-model="surveyData.waiter"
      />
    </article>

    <section class="my-12 flex flex-col gap-4">
      <article
        v-for="question in questions"
        class="flex items-center gap-4 border-b border-gray-300 pb-6 dark:border-gray-600 md:flex-row md:items-center md:gap-2"
      >
        <h3 class="flex-1">{{ question.text }}</h3>
        <div class="flex items-center justify-center gap-2">
          <BaseSelect :items="ratings" v-model="question.rating" />
          <Icon name="i-heroicons-star" size="32" class="text-primary" />
        </div>
      </article>
    </section>

    <BaseTextarea
      :label="surveyPageLabels.form.comments"
      v-model="surveyData.comments"
      placeholder="Escribe aquí tus comentarios"
    />

    <section class="mt-8 flex justify-end">
      <UButton
        :loading="loadingBtn"
        size="lg"
        :label="
          loadingBtn
            ? surveyPageLabels.form.loading
            : surveyPageLabels.form.button
        "
        icon="i-heroicons-paper-airplane"
        type="submit"
      />
    </section>
  </UForm>
</template>
