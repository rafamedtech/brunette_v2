<script setup lang="ts">
import noItems from '@/assets/img/no-items.svg';

const store = useMainStore();
const { isLoading } = storeToRefs(store);

const { params } = useRoute();
const [slug] = params.slug;
const { category, getCurrentCategory } = useMenu();
await getCurrentCategory(slug);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <CategoryCard :category="(category as Category)" title-size="large" />
      </template>

      <template #content>
        <section class="relative">
          <section
            v-if="!category?.sections"
            class="flex flex-col justify-center items-center min-h-[60vh] px-4 content"
          >
            <img :src="noItems" class="max-w-full mb-8" alt="" />
            <p class="text-lg">No hay nada aquí aún.</p>
          </section>

          <section v-else class="my-4 pb-16 md:grid md:grid-cols-2 md:gap-8">
            <div v-for="section in category?.sections" :key="section._id">
              <SectionBanner :section="section" />
              <SectionItems
                :items="section.items"
                :one-column="category?.sections.length ? category?.sections.length <= 1 : false"
              />
            </div>
          </section>

          <ScrollToTop />
        </section>
      </template>
    </MainSection>
  </main>
</template>
