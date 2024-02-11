<script setup lang="ts">
const { event } = defineProps<{
  event: Evento;
}>();
const { name, description, cover } = event;
</script>

<template>
  <UCard
    :ui="{
      base: 'container items-center  group min-w-0 relative h-[40rem]',
      body: { padding: 'px-0 py-0 sm:p-0 h-full' },
      rounded: 'rounded-xl',
    }"
  >
    <img
      class="rounded-2xl h-full w-full absolute md:mx-auto object-cover z-10 dark:brightness-75 group-hover:brightness-[.25] transition-all"
      :src="cover"
      alt="Event cover"
    />
    <section
      class="invisible group-hover:visible scale-95 max-w-full group-hover:scale-100 transition-all z-[999] relative p-8 flex flex-col justify-center h-full"
    >
      <h2 class="text-center text-2xl font-bold uppercase text-primary">
        {{ name }}
      </h2>
      <p class="text-gray-100">{{ description }}</p>
    </section>
  </UCard>
</template>
