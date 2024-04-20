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
      td: { padding: 'px-2', base: 'w-fit' },
      default: { sortButton: { color: 'primary' } },
    }"
    class="lg:hidden"
  >
    <template #createdAt-data="{ row }">
      <span :class="{ 'font-bold': row.new }" class="block w-fit max-w-fit">{{
        dateFormatter("short", row.createdAt)
      }}</span>
    </template>

    <template #waiter-data="{ row }">
      <NuxtLink :to="`/admin/encuestas/${row.id}`">
        <span :class="{ 'font-bold': row.new }">
          {{ row.waiter }}
        </span>
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
        class="w-fit"
      />
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
      <span :class="{ 'font-bold': row.new }">{{
        dateFormatter("short", row.createdAt)
      }}</span>
    </template>

    <template #waiter-data="{ row }">
      <UButton
        color="gray"
        variant="link"
        :to="`/admin/encuestas/${row.id}`"
        :padded="false"
      >
        <span :class="{ 'font-bold': row.new }" class="hover:text-primary">{{
          row.waiter
        }}</span>
      </UButton>
    </template>

    <template #rating-data="{ row }">
      <span
        class="absolute hidden text-center md:static md:block"
        :class="{
          'text-primary': getRating(row) === 5,
          'text-yellow-500': getRating(row) < 5 && getRating(row) >= 4,
          'text-red-500': getRating(row) < 4,
          'font-bold': row.new,
        }"
        >{{ getRating(row) }}</span
      >
    </template>

    <template #new-data="{ row }">
      <UButton
        :color="row.new ? 'primary' : 'black'"
        variant="link"
        size="sm"
        :icon="row.new ? 'i-heroicons-envelope' : 'i-heroicons-envelope-open'"
        :to="`/admin/encuestas/${row.id}`"
        inline
        :ui="{ inline: 'flex-col' }"
        class="mx-auto w-full"
      >
        <span class="text-xs" :class="{ 'font-bold': row.new }">{{
          row.new ? "Nueva" : "Leída"
        }}</span>
      </UButton>
    </template>
  </UTable>
</template>
