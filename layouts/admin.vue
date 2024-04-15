<script setup lang="ts">
const { adminLinks } = useNav();
</script>

<template>
  <main class="relative z-0 flex w-full justify-between lg:pt-0">
    <section class="hidden justify-between lg:flex lg:w-1/6">
      <Sidebar :items="adminLinks" />
    </section>

    <div class="flex-auto transition-all lg:w-5/6">
      <Topbar admin />
      <div
        class="min-h-screen bg-gray-100 px-4 transition-colors dark:bg-dark-medium lg:relative lg:px-12"
      >
        <slot> </slot>
      </div>
      <BottomNavbar :items="adminLinks[0]" class="lg:hidden" />
    </div>
  </main>
</template>
