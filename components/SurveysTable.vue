<script setup lang="ts">
import type { SurveyWithQuestions } from "@/types/Survey";
import { mobileColumns, baseColumns } from "@/utils/table-columns";

const { surveys } = defineProps<{ surveys: SurveyWithQuestions[] }>();
const { getRating } = useSurvey();

const { dateFormatter } = useFormatters();
</script>

<template>
  <UTable
    :rows="surveys"
    :columns="mobileColumns"
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
    class="lg:hidden"
  >
    <template #createdAt-data="{ row }">
      {{ dateFormatter("short", row.createdAt) }}
    </template>

    <template #waiter-data="{ row }">
      <NuxtLink :to="`/admin/encuestas/${row.id}`">
        {{ row.waiter }}
      </NuxtLink>
    </template>

    <template #new-data="{ row }">
      <UButton
        :color="row.new ? 'primary' : 'black'"
        variant="ghost"
        size="sm"
        :icon="row.new ? 'i-heroicons-envelope' : 'i-heroicons-envelope-open'"
        :to="`/admin/encuestas/${row.id}`"
        inline
        :ui="{ inline: 'flex-col' }"
        class="w-full"
      >
        <span class="text-[10px]" :class="{ 'font-bold': row.new }">{{
          row.new ? "Nueva" : "Leída"
        }}</span>
      </UButton>
    </template>
  </UTable>

  <!-- Desktop table -->
  <UTable
    :rows="surveys"
    :columns="baseColumns"
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
    class="hidden lg:block"
  >
    <template #createdAt-data="{ row }">
      {{ dateFormatter("short", row.createdAt) }}
    </template>

    <template #waiter-data="{ row }">
      <UButton
        color="gray"
        variant="link"
        :to="`/admin/encuestas/${row.id}`"
        :padded="false"
      >
        {{ row.waiter }}
      </UButton>
    </template>

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
    </template>

    <template #new-data="{ row }">
      <UButton
        :color="row.new ? 'primary' : 'black'"
        variant="ghost"
        size="sm"
        :icon="row.new ? 'i-heroicons-envelope' : 'i-heroicons-envelope-open'"
        :to="`/admin/encuestas/${row.id}`"
        inline
        :ui="{ inline: 'flex-col' }"
        class="w-full"
      >
        <span class="text-xs" :class="{ 'font-bold': row.new }">{{
          row.new ? "Nueva" : "Leída"
        }}</span>
      </UButton>
    </template>
  </UTable>
</template>
