<script setup lang="ts">
const store = useMainStore();
const { isLoading } = storeToRefs(store);

const { categories, getMenu } = useMenu();

await getMenu();

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading title="Menú" class="title-heading" />
      </template>

      <template #content>
        <section class="grid mt-4 md:grid-cols-2 gap-8 md:gap-8 md:px-2 content">
          <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
        </section>
      </template>
    </MainSection>
  </main>
</template>
