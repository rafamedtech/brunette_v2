<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const { categories, getMenu } = useMenu();

const { menuPageLabels } = useI18n();

await getMenu();

onMounted(() => {
  isLoading.value = false;
});

useHead({
  title: menuPageLabels.value.title,
  meta: [
    {
      name: "description",
      content: menuPageLabels.value.description,
    },
  ],
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading">
      <template #heading>
        <AppHeading :title="menuPageLabels.title" />
      </template>

      <template #content>
        <section class="grid gap-6 md:grid-cols-2 md:gap-8 md:px-2 md:pt-4">
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
