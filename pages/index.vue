<script setup lang="ts">
import mainCover from "@/assets/img/brunette-portada.jpg";
import { restInfo } from "@/utils/restInfo";

const store = useStore();
const { language } = storeToRefs(store);

const isLoading = ref(true);

const aboutInfo = computed(() => {
  return language.value === "es" ? restInfo.es : restInfo.en;
});

const { aboutPageLabels } = useI18n();

onMounted(() => {
  isLoading.value = false;
});

useHead({
  title: aboutPageLabels.value.title,
  meta: [
    {
      name: "description",
      content: aboutPageLabels.value.description,
    },
  ],
});

definePageMeta({
  layout: "notop",
});
</script>

<template>
  <section class="dark:text-base-100 text-dark-strong lg:mt-4">
    <section class="md:mx-auto md:w-1/2">
      <UCard
        :ui="{
          base: 'relative w-full',
          body: { padding: 'px-0 py-0 sm:p-0' },
          rounded: 'rounded-xl',
        }"
      >
        <img
          :src="mainCover"
          class="h-52 w-full min-w-full rounded-b-xl object-cover brightness-50 lg:h-52"
          alt=""
        />

        <section
          class="absolute bottom-0 z-10 flex w-full flex-col justify-center rounded-b-xl bg-gradient-to-t from-black to-transparent pl-4"
        >
          <Logo />
          <p
            class="text-primary font-montserrat text-4xl font-bold lg:text-3xl"
          >
            {{ aboutInfo.name }}
          </p>
          <p class="pb-8 text-gray-100">{{ aboutInfo.description }}</p>
        </section>
      </UCard>
      <section class="px-2">
        <section class="text-primary mb-4 mt-8 flex justify-center gap-4">
          <NuxtLink
            v-for="{ id, name, icon, url } in aboutInfo.socials"
            :key="id"
            :to="url"
            target="_blank"
            class="flex flex-col items-center"
          >
            <Icon :name="icon" size="32" />
            <span class="text-dark-strong dark:text-gray-100">{{ name }}</span>
          </NuxtLink>
        </section>
        <AppHeading :title="aboutPageLabels.title" />
        <section class="text-primary py-4">
          <h3 class="text-xl font-bold">
            {{ aboutPageLabels.address }}
            <span
              class="block text-base font-normal text-dark-strong dark:text-gray-100"
              >{{ aboutInfo.address }}</span
            >
          </h3>
          <h4 class="pt-4 text-xl font-bold">
            {{ aboutPageLabels.phone }}
            <span
              class="block text-base font-normal text-dark-strong dark:text-gray-100"
              >{{ aboutInfo.phone }}</span
            >
          </h4>
        </section>

        <section class="dark:text-gray-100 md:mx-auto md:w-1/2">
          <h3 class="text-primary text-xl font-bold">
            {{ aboutPageLabels.schedule }}
          </h3>
          <section
            v-for="{ id, name, time } in aboutInfo.schedule"
            :key="id"
            class="flex justify-between gap-4"
          >
            <h4>{{ name }}</h4>
            <span>{{ time }}</span>
          </section>
        </section>

        <section class="pt-4">
          <h3 class="text-primary text-xl font-bold">Secciones</h3>

          <section class="flex justify-center gap-2 pt-4">
            <UButton
              to="/menu"
              size="lg"
              icon="i-heroicons-clipboard-document-list-solid"
              >Menu</UButton
            >
            <UButton
              to="/eventos"
              size="lg"
              icon="i-heroicons-calendar-days-solid"
              >Eventos</UButton
            >
            <UButton
              to="/encuesta"
              size="lg"
              icon="i-heroicons-clipboard-document-check-solid"
              >Encuesta</UButton
            >
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
