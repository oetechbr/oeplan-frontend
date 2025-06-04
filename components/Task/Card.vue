<script setup lang="ts">
import type { Task } from '~/shared/types/task';

defineProps<{
    data: Task;
}>()
</script>
<template>
    <NuxtLink :to="`/board/tasks/${data.uuid}`">
        <UCard class="min-h-38 transition hover:scale-[1.01] hover:shadow-md hover:cursor-pointer" variant="subtle">
            <div class="flex flex-col gap-2 ">
                <div class="flex justify-between items-center">
                    <h3 class="font-semibold text-lg">
                        {{ data.title }}
                    </h3>
                    <UBadge color="info" variant="soft" size="sm">
                        {{ data.priority }}
                    </UBadge>
                </div>

                <p class="text-sm line-clamp-2">
                    {{ data.description }}
                </p>

                <div class="flex justify-between items-center mt-auto">
                    <div class="text-xs">
                        Assigned to: <span class="font-medium">{{ data.assigned_by.first_name }}</span>
                    </div>
                    <UBadge color="info" variant="soft" size="sm">
                        {{ data.status }}
                    </UBadge>
                </div>

                <div v-if="data.due_date" class="text-xs">
                    Due: {{ data.due_date }}
                </div>
            </div>
        </UCard>
    </NuxtLink>
</template>
