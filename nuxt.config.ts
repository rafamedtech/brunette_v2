// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/sanity",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
  },

  sanity: {
    projectId: "voo7gajt",
    dataset: "production",
  },

  supabase: {
    redirect: false,
  },
});
