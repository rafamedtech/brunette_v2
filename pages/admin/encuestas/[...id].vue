<script setup lang="ts">
import type { SurveyWithQuestions } from "~/types/Survey";

const route = useRoute();
const isLoading = ref(true);
const { surveys, getSurveys, getRating } = useSurvey();
await getSurveys();

const currentSurvey = surveys.value.find(
  (survey: SurveyWithQuestions) => survey.id === route.params.id[0],
) as SurveyWithQuestions;

onMounted(() => {
  isLoading.value = false;
});

const fortmatDate = (date: Date | string | undefined) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
  if (date === undefined) return;
  return new Date(date).toLocaleString("es-MX", dateOptions)
};

definePageMeta({
  layout: "admin",
  
});
</script>

<template>
  <main class="relative">
    <MainSection :loading="isLoading" class=" pb-16">
      <template #heading>
        <AppHeading
          title="Detalles de la encuesta"
          :description="`Recibida el ${fortmatDate(currentSurvey?.createdAt)}`"
        />
      </template>

      <template #content>
        <section class="flex flex-col gap-4 max-w-xl mx-auto">
          <section class="flex flex-col w-fit mx-auto text-center">
            <h4 class="text-primary font-bold text-2xl">Rating</h4>
            <span class="text-3xl">{{ getRating(currentSurvey) }}</span>
          </section>
          <UCard>
            <template #header>
              <h3 class="font-bold text-primary">Datos generales</h3>
            </template>
            <div>
              <p>
                <strong >Mesero:</strong>
                {{ currentSurvey?.waiter }}
              </p>
              <p>
                <strong >Cliente:</strong>
                {{ currentSurvey?.name }}
              </p>
              <p>
                <strong >Correo:</strong>
                {{ currentSurvey?.email }}
              </p>
            </div>
          </UCard>

          <UCard :ui="{ body: { padding: 'py-0 pb-4' } }">
            <template #header>
              <h3 class="font-bold text-primary">Preguntas</h3>
            </template>
            <div>
              <p
                v-for="question in currentSurvey?.questions"
                :key="question.id"
                class="flex items-center gap-4 justify-between border-b border-gray-300 py-4 dark:border-gray-600 md:flex-row md:items-center md:gap-2"
              >
                <span>{{ question.text }}</span>
                <div class="flex items-center gap-2">
                  <strong >{{ question.rating }}</strong>
                <Icon name="i-heroicons-star" size="32" class="text-primary" />
                </div>
              </p>
            </div>

            <template #footer>
              <h3 class="text-primary font-bold">Comentarios</h3>
              <p :class="{'text-gray-400 italic': !currentSurvey?.comments}" class="pt-2">
                {{ currentSurvey?.comments ? currentSurvey?.comments : 'Sin comentarios'}}
              </p>
            </template>
          </UCard>
        </section>
      </template>
    </MainSection>
    <ScrollToTop back-link="/admin/encuestas" />
  </main>
</template>
~/types/survey