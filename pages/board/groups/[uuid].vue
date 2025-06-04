<script setup lang="ts">
import type { Group } from '~/shared/types/group';
import type { Task } from '~/shared/types/task';

definePageMeta({
    layout: 'dashboard'
})

const router = useRouter()
const route = useRoute()

const { data: group, status: groupStatus } = await useLazyFetch<Group>(`/api/groups/${route.params.uuid}`)
const { data: tasks } = await useLazyFetch<Task[]>(`/api/tasks`)

const doneTasks = computed(() => tasks!.value!.filter(t => t.status === 'DONE'))
const pendingTasks = computed(() => tasks!.value!.filter(t => t.status === 'PENDING'))
const inProgressTasks = computed(() => tasks!.value!.filter(t => t.status === 'IN_PROGRESS'))
</script>

<template>
    <div v-if="groupStatus == 'pending'">
        Loading...
    </div>
    <div v-else class="flex flex-col gap-2">
        <div class="flex gap-2 items-center justify-between">
            <div class="flex gap-2 items-center">
                <UButton icon="i-heroicons-arrow-left" variant="ghost" @click="router.back()" />

                <h1 class="text-2xl font-bold">
                    {{ group.title }}
                </h1>
            </div>

            <div class="flex gap-2">
                <GroupInviteModal />
                <UButton icon="mdi:edit">
                    Editar
                </UButton>
            </div>
        </div>

        <UCard class="mt-6" variant="subtle">
            <template #header>
                <div class="flex flex-wrap gap-2">
                    <UBadge color="primary" variant="soft">
                        {{ group.category }}
                    </UBadge>
                    <UBadge color="primary" variant="soft">
                        {{ group.visibility }}
                    </UBadge>
                </div>
            </template>

            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-1">
                    <p>
                        {{ group.description }}
                    </p>

                    <div class="flex flex-col gap-4 mt-6 ">
                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-calendar" />
                            <span>Criado em: {{ new Date(group.created_at).toLocaleString() }}</span>
                        </div>

                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-arrow-path" />
                            <span>Atualizado: {{ new Date(group.updated_at).toLocaleString() }}</span>
                        </div>

                        <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-user" />
                            <span>Criado por: {{ group.owner_uuid }}</span>
                        </div>
                    </div>

                    <div v-if="group.tags.length" class="mt-4 flex flex-wrap gap-2">
                        <UIcon name="mdi:tags" />
                        <UBadge v-for="tag in group.tags" :key="tag" color="primary" variant="soft">
                            {{ tag }}
                        </UBadge>
                    </div>
                </div>

                <div
                    class="flex h-40 w-full md:w-60 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                    <UIcon name="i-heroicons-photo" class="h-10 w-10 " />
                </div>
            </div>
        </UCard>

        <div class="space-y-4 mt-5">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Tarefas</h2>
                    <p class="text-sm ">
                        Gerencie e acompanhe todas as tarefas
                    </p>
                </div>
                <TaskCreateModal />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 class="font-semibold text-lg mb-2">Para fazer ({{ pendingTasks.length }})</h3>
                    <div class="space-y-3">
                        <TaskCard v-for="task in pendingTasks" :key="task.title" :data="task" />
                    </div>
                </div>

                <div>
                    <h3 class="font-semibold text-lg mb-2">Fazendo ({{ inProgressTasks.length }})</h3>
                    <div class="space-y-3">
                        <TaskCard v-for="task in inProgressTasks" :key="task.title" :data="task" />
                    </div>
                </div>

                <div>
                    <h3 class="font-semibold text-lg mb-2">Feito ({{ doneTasks.length }})</h3>
                    <div class="space-y-3">
                        <TaskCard v-for="task in doneTasks" :key="task.title" :data="task" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
