<script setup lang="ts">
import type { SurveyWithQuestions } from "@/types/Survey";

const { surveys } = defineProps<{ surveys: SurveyWithQuestions[] }>();

const columns = [
  {
    key: "createdAt",
    label: "Fecha",
    sortable: true,
  },
  {
    key: "waiter",
    label: "Mesero",
    sortable: true,
  },
  // {
  //   key: "rating",
  //   label: "Rating",
  //   sortable: true,
  //   class: "hidden absolute md:static md:block",
  // },
  {
    key: "actions",
    label: "",
  },
];

const fortmatDate = (date: Date | string | undefined) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  if (date === undefined) return;
  return new Date(date).toLocaleString("es-MX", dateOptions);
};

const { getRating } = useSurvey();
</script>

<template>
  <UTable
    :rows="surveys"
    :columns="columns"
    :empty-state="{
      icon: 'i-heroicons-document-text',
      label: 'No hay encuestas',
    }"
    :sort-button="{
      color: 'primary',
      variant: 'ghost',
      square: false,
    }"
    :ui="{
      th: { color: 'text-primary' },
      default: { sortButton: { color: 'primary' } },
    }"
    class="w-full"
  >
    <template #createdAt-data="{ row }">
      {{ fortmatDate(row.createdAt) }}
    </template>
    <!-- 
    <template #rating-data="{ row }">
      <span
        class="absolute hidden text-center font-bold md:static md:block"
        :class="{
          'text-primary': getRating(row) === 5,
          'text-yellow-500': getRating(row) < 5 && getRating(row) >= 4,
          'text-red-500': getRating(row) < 4,
        }"
        >{{ getRating(row) }}</span
      >
    </template> -->

    <template #actions-data="{ row }">
      <UButton
        color="primary"
        variant="ghost"
        size="sm"
        icon="i-heroicons-arrow-top-right-on-square"
        :to="`/admin/encuestas/${row.id}`"
        inline
        :ui="{ inline: 'flex-col' }"
      >
      </UButton>
    </template>
  </UTable>
</template>
