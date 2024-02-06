<template>
  <main class="flex w-full justify-between lg:pt-0 relative">
    <section class="hidden lg:flex justify-between lg:w-1/6">
      <Sidebar />
    </section>

    <div class="transition-all flex-auto lg:w-5/6">
      <Topbar />
      <div
        class="bg-gray-100 dark:bg-dark-medium transition-colors lg:relative px-4 lg:px-12 min-h-screen"
      >
        <slot> </slot>
      </div>
      <BottomNavbar class="lg:hidden" />
    </div>
  </main>
</template>
