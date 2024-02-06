// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/sanity', "@vueuse/nuxt"],

  sanity: {
    projectId: 'voo7gajt',
    dataset: 'production',
  },
});