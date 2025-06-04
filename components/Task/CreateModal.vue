<script setup lang="ts">
import { z } from 'zod'

const isOpen = ref(false)

// Form state
const formState = reactive<Partial<Schema>>({
    title: '',
    description: '',
    due_date: '',
    priority: 'Low',
    status: 'Pending',
})

type Schema = z.output<typeof schema>

// Validation schema
const schema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    due_date: z.string().min(1, 'Data é obrigatória'),
    priority: z.enum(['Low', 'Medium', 'High']),
    status: z.enum(['Pending', 'In Progress', 'Completed']),
})

// Submit handler
function handleSubmit() {
    console.log('Task criada:', { ...formState })
    isOpen.value = false
}
</script>


<template>
    <UModal v-model:open="isOpen" title='Criar Nova Tarefa' description="Adicione uma nova tarefa ao sistema">
        <UButton icon="i-heroicons-plus" @click="isOpen = true">
            Criar Task
        </UButton>

        <template #body>
            <UForm :state="formState" :schema="schema" @submit="handleSubmit">
                <div class="form-group">
                    <label>Título</label>
                    <UInput v-model="formState.title" placeholder="Título" />
                </div>

                <div class="form-group">
                    <label>Descrição</label>
                    <UTextarea v-model="formState.description" placeholder="Descrição" />
                </div>

                <div class="flex justify-end gap-2">
                    <UButton primary="gray" variant="ghost" @click="isOpen = false">
                        Cancelar
                    </UButton>

                    <UButton type="submit">
                        Salvar
                    </UButton>
                </div>
            </UForm>
        </template>
    </UModal>
</template>


<style scoped>
.modal-card {
    max-width: 500px;
    margin: auto;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-group label {
    font-weight: 500;
    font-size: 0.9rem;
}
</style>
