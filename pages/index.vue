<script setup lang="ts">
import mainCover from '@/assets/img/brunette-portada.jpg';
import { restInfo } from '@/utils/restInfo';

const store = useStore();
const { language } = storeToRefs(store);

const isLoading = ref(true);

const aboutInfo = computed(() => {
  return language.value === 'es' ? restInfo.es : restInfo.en;
});

const { aboutPageLabels } = useI18n();

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading :title="aboutPageLabels.title" />
      </template>

      <template #content>
        <section class="text-dark-strong dark:text-base-100 lg:mt-4">
          <section class="md:w-1/2 md:mx-auto">
            <UCard
              :ui="{
                base: 'relative w-full',
                body: { padding: 'px-0 py-0 sm:p-0' },
                rounded: 'rounded-xl',
              }"
            >
              <img
                :src="mainCover"
                class="min-w-full w-full object-cover h-36 lg:h-52 rounded-xl brightness-50"
                alt=""
              />

              <section
                class="rounded-b-xl flex-col absolute bottom-0 z-10 flex h-1/3 w-full justify-center bg-gradient-to-t from-black to-transparent pl-4"
              >
                <p class="font-montserrat text-3xl text-primary lg:text-3xl">
                  {{ aboutInfo.name }}
                </p>
                <p class="text-gray-100 pb-8">{{ aboutInfo.description }}</p>
              </section>
            </UCard>
            <section class="flex justify-center gap-4 mt-8 text-primary">
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
            <section class="py-8 text-primary">
              <h3 class="font-bold">
                {{ aboutPageLabels.address }}
                <span class="block text-dark-strong font-normal dark:text-gray-100">{{
                  aboutInfo.address
                }}</span>
              </h3>
              <h4 class="font-bold">
                {{ aboutPageLabels.phone }}
                <span class="block text-dark-strong font-normal dark:text-gray-100">{{
                  aboutInfo.phone
                }}</span>
              </h4>
            </section>
          </section>

          <section class="my-4 md:w-1/2 md:mx-auto dark:text-gray-100">
            <h3 class="text-primary text-xl font-bold">{{ aboutPageLabels.schedule }}</h3>
            <section
              v-for="{ id, name, time } in aboutInfo.schedule"
              :key="id"
              class="flex gap-4 justify-between"
            >
              <h4>{{ name }}</h4>
              <span>{{ time }}</span>
            </section>
          </section>
        </section>
      </template>
    </MainSection>
  </main>
</template>
