export function useI18n() {
  const store = useStore();
  const { language, loadingScreen } = storeToRefs(store);

  const aboutPageLabels = computed(() => {
    return language.value === "es"
      ? {
          title: "Acerca del restaurant",
          address: "Dirección:",
          phone: "Teléfono:",
          schedule: "Horario:",
        }
      : {
          title: "About the restaurant",
          address: "Address:",
          phone: "Phone:",
          schedule: "Schedule:",
        };
  });

  const surveyPageLabels = computed(() => {
    return language.value === "es"
      ? {
          title: "Encuesta de satisfacción",
          description: "Agradecemos su opinión respondiendo unas preguntas",
          form: {
            name: "Nombre",
            email: "Correo electrónico",
            waiter: "Mesero que le atendió",
            comments: "Comentarios",
            button: "Enviar",
            loading: "Enviando",
          },
          done: "¡Encuesta Enviada!",
          modalTitle: "¡Gracias por tu opinión!",
          modalDescription:
            "Con tus comentarios podemos mejorar nuestros productos y servicios",
          exit: "Salir",
        }
      : {
          title: "Satisfaction survey",
          description:
            "We appreciate your opinion by answering a few questions",
          form: {
            name: "Name",
            email: "Email",
            waiter: "Waiter who attended you",
            comments: "Comments",
            button: "Send",
            loading: "Sending",
          },
          done: "Survey Completed!",
          modalTitle: "Thanks for your opinion!",
          modalDescription:
            "With your comments we can improve our products and services",
          exit: "Exit",
        };
  });

  const eventsPageLabels = computed(() => {
    return language.value === "es"
      ? {
          title: "Eventos",
          description: "Encuentra nuestros eventos y promociones",
          fullscreenButton: "Ampliar",
        }
      : {
          title: "Events",
          description: "Find our events and promotions",
          fullscreenButton: "Full screen",
        };
  });

  const menuPageLabels = computed(() => {
    return language.value === "es"
      ? {
          title: "Menú",
          description: "Descubre nuestros platillos y bebidas",
        }
      : {
          title: "Menu",
          description: "Discover our dishes and drinks",
        };
  });

  const scrollToTopLabels = computed(() => {
    return language.value === "es"
      ? {
          scrollToTop: "Arriba",
          back: "Atrás",
        }
      : {
          scrollToTop: "Top",
          back: "Back",
        };
  });

  const navLinksLabels = computed<NavLink[]>(() => {
    return [
      {
        label: language.value === "es" ? "Menú" : "Menu",
        icon: "i-heroicons-clipboard-document-list-solid",
        to: "/menu",
      },
      {
        label: language.value === "es" ? "Eventos" : "Events",
        icon: "i-heroicons-calendar-days-solid",
        to: "/eventos",
      },
      {
        label: language.value === "es" ? "Encuesta" : "Survey",
        icon: "i-heroicons-clipboard-document-check-solid",
        to: "/encuesta",
      },
      {
        label: language.value === "es" ? "Acerca de" : "About",
        icon: "i-heroicons-building-storefront-solid",
        to: "/",
      },
    ];
  });

  const changeLanguage = () => {
    loadingScreen.value = true;

    setTimeout(() => {
      if (language.value === "es") {
        language.value = "en";
      } else {
        language.value = "es";
      }

      loadingScreen.value = false;
    }, 1000);
  };

  return {
    changeLanguage,
    menuPageLabels,
    aboutPageLabels,
    surveyPageLabels,
    eventsPageLabels,
    scrollToTopLabels,
    navLinksLabels,
  };
}
