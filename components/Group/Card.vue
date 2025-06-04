<script setup lang="ts">
import type { Group } from '~/shared/types/group';

defineProps<{
  data: Group
}>()
</script>

<template>
  <NuxtLink :to="`/board/groups/${data.uuid}`">
    <UCard class="p-0 m-0 transition hover:scale-[1.01] hover:shadow-md" variant="subtle"
      :ui="{ header: 'p-0 sm:p-0' }">
      <template #header>
        <img :src="`https://picsum.photos/seed/${data.title}/800/500`" alt="Course image"
          class="max-h-50 w-full object-cover rounded-t-lg" />
      </template>

      <div class="flex flex-col gap-2">
        <span class="text-xs"> {{ data.category }}</span>
        <h2 class="text-lg font-semibold m-0">{{ data.title }}</h2>
        <p class="text-sm m-0">{{ data.description }}</p>

        <div class="flex items-center gap-2 text-sm ui-text">
          <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
          {{ data.updated_at }}
        </div>

        <div class="flex items-center gap-2 text-sm ui-text">
          <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
          {{ data.category }}
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>