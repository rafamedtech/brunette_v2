<script setup lang="ts">
const { event } = defineProps<{
  event: Evento;
}>();

const { name, description, cover } = event;
</script>

<template>
  <UCard
    :ui="{
      base: 'container items-center group min-w-full w-full border border-transparent hover:border-primary max-w-xs xl:h-[36rem] h-[30rem] lg:h-[28rem] h-full relative overflow-hidden bg-dark-strong shadow-lg transition-all',
      body: { padding: 'px-0 py-0 sm:p-0 h-full' },
      rounded: 'rounded-xl',
      item: 'snap-start',
    }"
  >
    <img
      class="absolute z-10 h-full w-full rounded-xl object-cover transition-all group-hover:brightness-[.25] dark:brightness-75 md:mx-auto"
      :src="cover"
      alt="Event cover"
    />
    <section
      class="invisible relative z-[999] flex h-full max-w-full scale-95 flex-col justify-center p-8 transition-all group-hover:visible group-hover:scale-100"
    >
      <h2 class="text-primary text-center text-2xl font-bold uppercase">
        {{ name }}
      </h2>
      <p class="text-center text-gray-100">{{ description }}</p>
    </section>
  </UCard>
</template>
