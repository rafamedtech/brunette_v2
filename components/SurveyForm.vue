<script setup lang="ts">
import { waitersList } from "@/utils/surveyInfo";
import type { FormSubmitEvent } from "#ui/types";
// import type { FormError, FormSubmitEvent } from "#ui/types";

// const validate = (state: any): FormError[] => {
//   const errors = [];
//   if (!state) errors.push({ path: "email", message: "Required" });
//   if (!state.password) errors.push({ path: "password", message: "Required" });
//   return errors;
// };

const store = useStore();
const { openModal } = storeToRefs(store);

const { surveyPageLabels } = useI18n();

const { surveyData, getQuestions, questions, sendSurvey, sendEmail } =
  useSurvey();
await getQuestions();

const loadingBtn = ref(false);
async function onSubmit(event: FormSubmitEvent<any>) {
  const survey = { ...event.data, questions: questions.value };

  loadingBtn.value = true;

  setTimeout(async () => {
    await sendSurvey(survey);
    // await sendEmail();
    openModal.value = true;
    loadingBtn.value = false;
  }, 500);
}

const ratings = [1, 2, 3, 4, 5];
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
