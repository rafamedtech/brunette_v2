<script setup lang="ts">
const { links } = useNav();
const { navLinksLabels } = useI18n();
</script>

<template>
  <main class="relative flex w-full justify-between lg:pt-0">
    <section class="hidden justify-between lg:flex lg:w-1/6">
      <Sidebar :items="links" />
    </section>

    <div class="flex-auto transition-all lg:w-5/6">
      <Topbar />
      <UContainer
        :ui="{ constrained: 'max-w-full' }"
        class="min-h-screen bg-gray-100 transition-colors dark:bg-dark-medium lg:relative lg:px-12"
      >
        <slot> </slot>
      </UContainer>
      <Transition name="up">
        <BottomNavbar :items="navLinksLabels" class="lg:hidden" />
      </Transition>

      <FeaturedEvent />
    </div>
  </main>
</template>
