<script setup>
import { sidebarLinks } from '@/utils/sidebarLinks';
</script>

<template>
  <UHorizontalNavigation
    :ui="{
      base: 'flex-col w-full',
      container: 'justify-between w-full',
      inner: 'flex-1 hover:text-white',
      active:
        'text-white before:bg-gray-800 active:before:bg-gray-800 hover:before:bg-gray-800 focus:before:bg-gray-800',
      inactive: 'hover:text-white text-gray-400 hover:before:bg-gray-800/50',
      icon: { active: 'text-gray-200', inactive: 'text-gray-500' },
    }"
    :links="sidebarLinks"
    class="fixed z-[999] bottom-0 bg-dark-strong"
  />
</template>
