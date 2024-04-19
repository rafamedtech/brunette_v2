<script setup lang="ts">
import type { SurveyWithQuestions } from "~/types/Survey";

const route = useRoute();
const isLoading = ref(true);
const { surveys, getSurveys, markSurveyAsRead, getRating } = useSurvey();
await getSurveys();

const currentSurvey = surveys.value.find(
  (survey: SurveyWithQuestions) => survey.id === route.params.id[0],
) as SurveyWithQuestions;

const loadingButton = ref(false);
const markAsReadButton = computed(() => ({
  icon: currentSurvey.new
    ? "i-heroicons-envelope-open-solid"
    : "i-heroicons-check-solid",
  label: loadingButton.value
    ? "Cargando..."
    : currentSurvey.new
      ? "Marcar como leída"
      : "Leída",
}));
function markAsRead() {
  loadingButton.value = true;

  setTimeout(async () => {
    await markSurveyAsRead(currentSurvey);
    loadingButton.value = false;
  }, 500);
}

const { dateFormatter } = useFormatters();

onMounted(() => {
  isLoading.value = false;
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<template>
  <main class="relative">
    <MainSection :loading="isLoading" class="pb-16">
      <template #heading>
        <AppHeading
          title="Detalles de la encuesta"
          :description="`Recibida el ${dateFormatter('long', currentSurvey?.createdAt)}`"
        />
      </template>

      <template #content>
        <section class="mx-auto flex max-w-xl flex-col gap-4">
          <section class="mx-auto flex w-fit flex-col text-center">
            <h4 class="text-2xl font-bold">Rating</h4>
            <span
              class="text-3xl"
              :class="{
                'text-primary': getRating(currentSurvey) === 5,
                'text-yellow-500':
                  getRating(currentSurvey) < 5 && getRating(currentSurvey) >= 4,
                'text-red-500': getRating(currentSurvey) < 4,
              }"
              >{{ getRating(currentSurvey).toFixed(2) }}</span
            >
          </section>
          <UCard>
            <template #header>
              <h3 class="text-primary font-bold">Datos generales</h3>
            </template>
            <div>
              <p>
                <strong>Mesero:</strong>
                {{ currentSurvey?.waiter }}
              </p>
              <p>
                <strong>Cliente: </strong>
                <span
                  :class="{ 'italic text-gray-400': !currentSurvey?.name }"
                  >{{ currentSurvey?.name || "Anónimo" }}</span
                >
              </p>
              <p>
                <strong>Correo: </strong>
                <span
                  :class="{ 'italic text-gray-400': !currentSurvey?.email }"
                  >{{ currentSurvey?.email || "No proporcionado" }}</span
                >
              </p>
            </div>
          </UCard>

          <UCard :ui="{ body: { padding: 'py-0 sm:py-2' } }">
            <template #header>
              <h3 class="text-primary font-bold">Preguntas</h3>
            </template>
            <div>
              <section
                v-for="question in currentSurvey?.questions"
                :key="question.id"
                class="flex items-center justify-between gap-4 py-4 dark:border-gray-600 md:flex-row md:items-center md:gap-2 md:py-2"
              >
                <span>{{ question.text }}</span>
                <div class="flex items-center gap-2">
                  <strong>{{ question.rating }}</strong>
                  <Icon
                    name="i-heroicons-star"
                    size="32"
                    class="text-primary"
                  />
                </div>
              </section>
            </div>

            <template #footer>
              <h3 class="text-primary font-bold">Comentarios</h3>
              <p
                :class="{ 'italic text-gray-400': !currentSurvey?.comments }"
                class="pt-2"
              >
                {{
                  currentSurvey?.comments
                    ? currentSurvey?.comments
                    : "Sin comentarios"
                }}
              </p>
            </template>
          </UCard>

          <UButton
            :variant="currentSurvey.new ? 'solid' : 'outline'"
            :label="markAsReadButton.label"
            :icon="markAsReadButton.icon"
            :loading="loadingButton"
            :disabled="loadingButton || !currentSurvey.new"
            class="mx-auto w-fit"
            @click="markAsRead"
          />
        </section>
      </template>
    </MainSection>
    <ScrollToTop back-link="/admin/encuestas" />
  </main>
</template>
