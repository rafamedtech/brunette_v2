<script setup lang="ts">
interface Props {
  category: Category | CategoryOutline;
  titleSize?: string;
  link?: boolean;
}

const { category, titleSize, link } = defineProps<Props>();

const { name, cover, slug } = toRefs(category);
</script>

<template>
  <NuxtLink
    :to="`/menu/${slug}`"
    class="w-full transition-all hover:scale-95 focus:scale-95 focus:rounded-xl focus:ring-4 focus:ring-green-500"
    :class="{ 'pointer-events-none': !link }"
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
        class="h-36 w-full min-w-full rounded-xl object-cover brightness-75 dark:brightness-50 md:h-52"
        alt=""
      />
      <section
        class="absolute bottom-0 z-10 flex h-1/3 w-full items-center rounded-b-xl bg-gradient-to-t from-black to-transparent pb-6 pl-4"
      >
        <span
          class="font-montserrat text-2xl text-gray-100 lg:text-3xl"
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
