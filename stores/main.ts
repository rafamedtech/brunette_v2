import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const isLoading = ref(true);
  const openModal = ref(false);
  const eventModal = ref(false); // Should be true in production
  const language = ref('es');

  const showScrollToTop = ref(false);

  return { language, isLoading, openModal, eventModal, showScrollToTop };
});
