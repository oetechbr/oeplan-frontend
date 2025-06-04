<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { ref } from 'vue';
import { z } from 'zod';

const { state } = useAuth();

const isOpen = ref(false)

const categories = ['Tecnologia', 'Educação', 'Negócios']
const visibilities = ['PRIVATE', 'PUBLIC']

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  tags: z.array(z.string()),
  category: z.string(),
  visibility: z.enum(['PRIVATE', 'PUBLIC']),
})

type Schema = z.output<typeof schema>

const formState = reactive<Partial<Schema>>({
  title: '',
  description: '',
  tags: [],
  category: '',
  visibility: 'PRIVATE',
})

async function handleSubmit(e: FormSubmitEvent<Schema>) {
  console.warn({ ...e.data, 'owner_uuid': state.value.user?.uuid })
  try {
    await $fetch('/api/groups', {
      method: 'POST',
      body: { ...e.data, 'owner_uuid': state.value.user?.uuid },
    })
    alert('Group created successfully!')
    isOpen.value = false
  } catch (error) {
    console.error('Error creating group:', error)
    alert('Failed to create group.')
  }
}
</script>

<template>
  <UModal v-model:open="isOpen" title='Criar Novo Grupo' description="Crie um novo grupo para gerênciar">
    <UButton color="primary" @click="isOpen = true" icon="i-mdi-plus">Novo Grupo</UButton>

    <template #body>
      <div class="modal-card">
        <UForm :schema="schema" :state="formState" @submit="handleSubmit">
          <div class="form-group">
            <label>Título</label>
            <UInput v-model="formState.title" placeholder="Título" />
          </div>

          <div class="form-group">
            <label>Descrição</label>
            <UTextarea v-model="formState.description" placeholder="Descrição" />
          </div>

          <div class="form-group">
            <label>Tags</label>
            <USelectMenu v-model="formState.tags" multiple :items="['SI', 'Sistemas', 'TI', 'Dev']"
              placeholder="Escolha as tags" />
          </div>

          <div class="form-group">
            <label>Categoria</label>
            <USelect v-model="formState.category" :items="categories" />
          </div>

          <div class="form-group">
            <label>Visibilidade</label>
            <USelect v-model="formState.visibility" :items="visibilities" />
          </div>

          <div class="flex justify-end w-full gap-2 mt-2">
            <UButton variant="ghost" @click="isOpen = false">Cancelar</UButton>
            <UButton type="submit">Criar</UButton>
          </div>
        </UForm>
      </div>
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
