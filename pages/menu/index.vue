<script setup lang="ts">
const store = useStore();
const { isLoading } = storeToRefs(store);

const { categories, getMenu } = useMenu();

await getMenu();

onMounted(() => {
  isLoading.value = false;
});

useSeoMeta({
  title: "Brunette Kitchen & Drinks | Menú 📖",
  description: "Conoce nuestros deliciosos platillos y mixología.",
  ogImage:
    "https://res.cloudinary.com/rafamed-dev/image/upload/v1705703429/menu/OG_Image_cl4k6w.png",
});
</script>

<template>
  <main>
    <MainSection :loading="isLoading" padded>
      <template #heading>
        <AppHeading title="Menú" />
      </template>

      <template #content>
        <section class="grid gap-6 md:grid-cols-2 md:gap-8 md:px-2 md:pt-4">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
            link
            rounded
          />
        </section>
      </template>
    </MainSection>
  </main>
</template>
