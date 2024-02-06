import { defineStore } from 'pinia';
import { allQuestions } from '@/sanity/queries';
// import type { SurveyOutline, SurveyWithQuestions } from '@/types/Survey';

export const useMainStore = defineStore('main', () => {
  const isLoading = ref(true);
  const openModal = ref(false);
  const eventModal = ref(false); // Should be true in productio
  const language = ref('es');

  const showScrollToTop = ref(false);

  const surveyData = reactive({
    name: '',
    email: '',
    waiter: 'No lo sé',
    comments: '',
    questions: [],
    new: true,
  });

  async function getQuestions() {
    const { data: questions } = await useSanityQuery(allQuestions);
    surveyData.questions = questions.value as any;
  }

  return { language, isLoading, openModal, eventModal, showScrollToTop, surveyData, getQuestions };
});
