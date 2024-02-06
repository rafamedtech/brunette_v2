<script setup lang="ts">
interface Props {
  category: Category;
  titleSize?: string;
}

const { category, titleSize } = defineProps<Props>();

const { name, cover, slug } = toRefs(category);
</script>

<template>
  <NuxtLink
    :to="`/menu/${slug}`"
    class="w-full focus:ring-4 focus:scale-95 transition-all hover:scale-105 focus:ring-green-500 focus:rounded-xl"
  >
    <UCard
      :ui="{
        base: 'relative w-full',
        body: { padding: 'px-0 py-0 sm:p-0' },
        rounded: 'rounded-xl',
      }"
    >
      <img
        :src="cover"
        class="min-w-full w-full object-cover h-36 lg:h-52 rounded-xl brightness-75 dark:brightness-50"
        alt=""
      />
      <section
        class="rounded-b-xl absolute bottom-0 pb-6 z-10 flex h-1/3 w-full items-center bg-gradient-to-t from-black to-transparent pl-4"
      >
        <span
          class="font-montserrat text-gray-100 text-2xl lg:text-3xl"
          :class="{
            'text-3xl lg:text-4xl': titleSize === 'large',
          }"
        >
          {{ name }}
        </span>
      </section>
    </UCard>
  </NuxtLink>
</template>
