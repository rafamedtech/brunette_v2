<script setup lang="ts">
import noItems from "@/assets/img/no-items.svg";

const store = useStore();
const { isLoading } = storeToRefs(store);

const { params } = useRoute();
const [slug] = params.slug;
const { category, getCurrentCategory } = useMenu();
await getCurrentCategory(slug);

const currentCategory = category.value as Category;

const oneColumn = ref(false);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <CategoryCard :category="currentCategory" title-size="large" />
      </template>

      <template #content>
        <section class="relative">
          <UCard class="lg:hidden">
            <div class="flex items-center justify-between">
              <p>Platillos por fila</p>
              <div class="flex justify-center gap-2">
                <UButton
                  label="1"
                  :variant="oneColumn ? 'solid' : 'outline'"
                  @click="() => (oneColumn = true)"
                />
                <UButton
                  label="2"
                  :variant="!oneColumn ? 'solid' : 'outline'"
                  @click="() => (oneColumn = false)"
                />
              </div>
            </div>
          </UCard>

          <section
            v-if="!category?.sections"
            class="content flex min-h-[60vh] flex-col items-center justify-center px-4"
          >
            <img :src="noItems" class="mb-8 max-w-full" alt="" />
            <p class="text-lg">No hay nada aquí aún.</p>
          </section>

          <section v-else class="my-4 pb-16 md:grid md:grid-cols-2 md:gap-8">
            <div v-for="section in category?.sections" :key="section._id">
              <SectionBanner :section="section" />
              <SectionItems :items="section.items" :one-column="oneColumn" />
            </div>
          </section>

          <ScrollToTop />
        </section>
      </template>
    </MainSection>
  </main>
</template>
