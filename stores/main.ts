import { defineStore } from 'pinia';

export const useStore = defineStore('main', () => {
  const isLoading = ref(true);
  const loadingScreen = ref(false);
  const openModal = ref(false);
  const eventModal = ref(false); // Should be true in production
  const fullscreenEvents = ref(false);
  const language = ref('es');
  const showScrollToTop = ref(false);

  return {
    language,
    isLoading,
    loadingScreen,
    openModal,
    eventModal,
    fullscreenEvents,
    showScrollToTop,
  };
});
