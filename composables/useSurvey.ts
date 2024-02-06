import { allQuestions } from '@/sanity/queries';
import type { SurveyOutline, QuestionFromApi, QuestionOutline } from '@/types/Survey';

export function useSurvey() {
  const questions = ref<QuestionOutline[]>([]);
  const surveyData = reactive<SurveyOutline>({
    name: '',
    email: '',
    waiter: 'No lo sé',
    comments: '',
    new: true,
  });

  const getQuestions = async () => {
    const { data } = await useSanityQuery<QuestionFromApi[]>(allQuestions);

    questions.value = data.value?.map((question) => {
      return {
        text: question.text,
        rating: question.rating,
      };
    }) as QuestionOutline[];
  };
  return { getQuestions, surveyData, questions };
}
