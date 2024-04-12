<script setup lang="ts">
const { items, columns } = defineProps<{
  items: Item[];
  columns: number;
}>();
</script>

<template>
  <ul
    class="grid grid-cols-1 gap-4 py-4 lg:grid-cols-2 lg:p-4"
    :class="{ 'grid-cols-2 text-left': columns === 2 }"
  >
    <li
      :class="{
        'mx-auto': items.length === 1,
        'border-b pb-4 dark:border-neutral-700': columns === 1,
      }"
      v-for="item in items"
      :key="item._id"
    >
      <div
        class="flex"
        :class="{
          'items-center justify-between gap-2': columns === 1,
          'flex-col items-start': columns === 2,
        }"
      >
        <section>
          <h4 class="text-primary text-base font-bold">
            {{ item.name }}
          </h4>

          <p v-if="item.description">{{ item.description }}</p>
        </section>
        <div v-if="item.price" class="flex gap-2">
          <p
            class="font-bold dark:text-gray-100"
            :class="{ 'text-black': !item.description }"
            v-if="item.price"
          >
            ${{ item.price }}
          </p>
        </div>
        <div v-if="item.variants">
          <div
            v-for="variant in item.variants"
            :key="variant._id"
            class="flex justify-between gap-2"
          >
            <p :class="{ 'text-primary': item.description }">
              {{ variant.name }}
            </p>
            <p class="dark:text-base-100 font-bold">${{ variant.price }}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
