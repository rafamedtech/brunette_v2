<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const { categories, getMenu } = useMenu();

const { menuPageLabels } = useI18n();

await getMenu();

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading :title="menuPageLabels.title" />
      </template>

      <template #content>
        <section class="grid md:pt-4 md:grid-cols-2 gap-6 md:gap-8 md:px-2">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
            link
          />
        </section>
      </template>
    </MainSection>
  </main>
</template>
