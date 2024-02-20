import { defineStore } from 'pinia';

export const useStore = defineStore('main', () => {
  const isLoading = ref(true);
  const openModal = ref(false);
  const eventModal = ref(true); // Should be true in production
  const fullscreenEvents = ref(false);
  const language = ref('es');

  const showScrollToTop = ref(false);

  return { language, isLoading, openModal, eventModal, fullscreenEvents, showScrollToTop };
});
