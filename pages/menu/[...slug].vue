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
const columns = ref(2);

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
          <div class="flex justify-end lg:hidden">
            <UFormGroup label="Platillos por fila">
              <USelectMenu :options="[1, 2]" v-model="columns" />
            </UFormGroup>
          </div>

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
              <SectionItems :items="section.items" :columns="columns" />
            </div>
          </section>

          <ScrollToTop back-link="/menu" />
        </section>
      </template>
    </MainSection>
  </main>
</template>
