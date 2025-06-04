<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { Comment } from '~/shared/types/comment'
import type { Task } from '~/shared/types/task'

const router = useRouter()
const route = useRoute()

definePageMeta({
    layout: 'dashboard'
})

const { data: task, status } = await useLazyFetch<Task>(`/api/tasks/${route.params.uuid}`)
const { data: comments, status: commentsStatus } = await useLazyFetch<Comment[]>(`/api/tasks/${route.params.uuid}/comments`)

// Date formatter
function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString()
}

const tabItems = [
    {
        label: 'Comentários',
        description: 'Make changes to your account here. Click save when you\'re done.',
        icon: 'mdi:user',
        slot: 'comments' as const
    },
    {
        label: 'Anexos',
        description: 'Change your password here. After saving, you\'ll be logged out.',
        icon: 'mdi:attachment',
        slot: 'attachments' as const
    },
    {
        label: 'Atividade',
        description: 'Change your password here. After saving, you\'ll be logged out.',
        icon: 'mdi:history',
        slot: 'activity' as const
    }
] satisfies TabsItem[]

interface FileAttachment {
    id: number
    name: string
    size: number;
}

const attachments = ref<FileAttachment[]>([
    {
        id: 1,
        name: 'Draft_Slides.pdf',
        size: 10000,
    },
])
</script>


<template>
    <div v-if="status == 'pending'">
        Loading...
    </div>
    <div v-else class="w-full">
        <div class="w-full space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex gap-2 items-center">
                    <UButton icon="i-heroicons-arrow-left" variant="ghost" @click="router.back()" />
                    <div>
                        <h1 class="text-2xl font-semibold">Detalhes da Tarefa</h1>
                        <p class="text-sm text-muted">
                            {{ task.tags[0] }} - {{ task.visibility }}
                        </p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <UButton icon="mdi:edit">
                        Editar
                    </UButton>
                    <UButton icon="mdi:dots-vertical" color="primary" variant="outline" />
                </div>
            </div>

            <!-- Task Card -->
            <UCard variant="subtle">
                <!-- Title & Labels -->
                <div class="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h2 class="text-xl font-semibold">{{ task.title }}</h2>
                        <p class="text-sm text-muted">Criada em {{ formatDate(task.created_at) }}</p>
                    </div>

                    <div class="flex gap-2">
                        <UBadge color="primary" variant="soft">
                            {{ task.priority }}
                        </UBadge>
                        <UBadge color="primary" variant="soft">
                            {{ task.status }}
                        </UBadge>
                    </div>
                </div>

                <!-- Description -->
                <div class="mt-6 space-y-4">
                    <div>
                        <h3 class="font-medium text-muted">Descrição</h3>
                        <p>
                            {{ task.description }}
                        </p>
                    </div>

                    <!-- Info Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-medium text-muted">Data final</h3>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-heroicons-calendar" />
                                <span v-if="task?.due_date">{{ formatDate(task.due_date) }}</span>
                                <span v-else>Sem data definida</span>
                            </div>
                        </div>

                        <div>
                            <h3 class="font-medium text-muted">Course</h3>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-heroicons-academic-cap" />
                                <span>{{ task.tags[0] }} - {{ task.visibility }}</span>
                            </div>
                        </div>

                        <div>
                            <h3 class="font-medium text-muted">Atribuído para:</h3>
                            <div class="flex items-center gap-3">
                                <UAvatar :alt="task?.assigned_to.first_name" :src="task.assigned_to.avatar_url" />
                                <div>
                                    <p class="text-sm font-medium">{{
                                        `${task.assigned_to.first_name} ${task.assigned_to.last_name}`
                                        }}
                                    </p>
                                    <p class="text-xs">
                                        {{ task.assigned_to.email }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 class="font-medium text-muted">Atribuído por:</h3>
                            <div class="flex items-center gap-3">
                                <UAvatar :name="task.assigned_by.first_name" :src="task.assigned_by.avatar_url" />
                                <div>
                                    <p class="text-sm font-medium">{{
                                        `${task.assigned_to.first_name} ${task.assigned_to.last_name}`
                                        }}
                                    </p>
                                    <p class="text-xs">{{ task?.assigned_by.email }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <div class="space-y-6 rounded-lg bg-elevated/50 ring ring-default divide-y divide-default p-4 sm:p-6">
                <!-- Tabs -->
                <UTabs :items="tabItems" class="w-full" variant="link" :ui="{ content: 'py-2' }">
                    <!-- Comments Tab -->
                    <template #comments="{ item }">
                        <div class="space-y-4">
                            <div v-for="comment in comments" :key="comment.id" class="flex gap-3">
                                <UAvatar :name="comment.user.first_name" :alt="comment.user.first_name"
                                    :src="comment.user.avatar_url" />
                                <div>
                                    <div class="flex items-center gap-2">
                                        <p class="font-medium">{{ comment.user.first_name }}</p>
                                        <span class="text-xs text-muted">{{ comment.created_at }}</span>
                                    </div>
                                    <p class="text-sm">
                                        {{ comment.content }}
                                    </p>
                                </div>
                            </div>

                            <!-- Add Comment -->
                            <div class="border-t border-muted pt-4 space-y-3">
                                <UTextarea placeholder="Adicione um comentário..." autoresize class="w-full" />
                                <div class="flex items-center gap-3">
                                    <UButton icon="i-heroicons-paper-clip" variant="outline">
                                        Adicionar arquivo
                                    </UButton>
                                    <UButton icon="i-heroicons-paper-airplane">
                                        Enviar
                                    </UButton>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Attachments Tab -->
                    <template #attachments="{ item }">
                        <div>
                            <div class="space-y-4">
                                <div v-for="(file, index) in attachments" :key="file.name"
                                    class="flex items-center justify-between rounded-md border border-muted px-4 py-3">
                                    <div class="flex items-center gap-3">
                                        <UIcon name="i-heroicons-document" class="text-muted w-5 h-5" />
                                        <div>
                                            <div class="font-medium text-sm">{{ file.name }}</div>
                                            <div class="text-xs text-muted">{{ file.size }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <UButton icon="mdi:tray-download" color="primary" title="Baixar arquivo" />
                                        <UButton icon="i-heroicons-x-mark" color="primary" variant="ghost"
                                            title="Excluir arquivo" />
                                    </div>
                                </div>

                                <div class="flex">
                                    <UButton icon="i-heroicons-paper-clip" variant="ghost" label="Novo anêxo" />
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Activity Log Tab -->
                    <template #activity="{ item }">
                        <p class="text-sm text-muted text-center">Nenhum registro de atividades ainda.</p>
                    </template>
                </UTabs>
            </div>
        </div>
    </div>
</template>