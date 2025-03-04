<script setup lang="ts">
interface Props {
  category: Category | CategoryOutline;
  titleSize?: string;
  link?: boolean;
  rounded?: boolean;
  wide?: boolean;
}

const { category, titleSize, link } = defineProps<Props>();

const { name, cover, slug } = toRefs(category);
</script>

<template>
  <UCard
    :ui="{
      base: 'relative w-full',
      body: { padding: 'px-0 py-0 sm:p-0' },
      rounded: rounded ? 'rounded-xl' : 'rounded-none',
    }"
  >
    <img
      :src="cover"
      class="h-52 w-full min-w-full rounded-b-xl object-cover brightness-75 dark:brightness-50 md:h-52"
      alt=""
    />
    <section
      class="absolute bottom-0 z-10 flex h-1/2 w-full items-center bg-gradient-to-t from-black to-transparent pb-6 pl-4"
      :class="{ 'rounded-b-xl': rounded }"
    >
      <span
        class="text-primary font-montserrat text-2xl font-bold lg:text-3xl"
        :class="{
          'text-3xl lg:text-4xl': titleSize === 'large',
        }"
      >
        {{ name }}
      </span>
    </section>
  </UCard>
</template>
