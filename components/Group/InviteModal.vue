<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { ref } from 'vue';
import { z } from 'zod';

const isOpen = ref(false)

const schema = z.object({
  username: z.string().nonempty({ message: "Username é obrigatório" }),
  first_name: z.string().nonempty({ message: "Primeiro nome é obrigatório" }),
  last_name: z.string().nonempty({ message: "Segundo nome é obrigatório" }),
  email: z.string().email({ message: "Digite um email válido" }).nonempty({ message: "Email é obrigatório" }),
  role: z.enum(["COODINATOR", "TEACHER"]).default("TEACHER"),
})

type Schema = z.output<typeof schema>

const formState = reactive<Partial<Schema>>({
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  role: 'TEACHER',
})

watch(
  () => [formState.first_name, formState.last_name],
  ([firstName, lastName]) => {
    const first = (firstName || '').toString().trim().toLowerCase()
    const last = (lastName || '').toString().trim().toLowerCase()

    if (first || last) {
      formState.username = `${first}${last}`.replace(/\s+/g, '')
    } else {
      formState.username = ''
    }
  }
)

async function handleSubmit(e: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/invites/users/invite', {
      method: 'POST',
      body: { user: { ...e.data } },
    })
    isOpen.value = false
  } catch (error) {
    console.error('Error creating group:', error)
  }
}
</script>

<template>
  <UModal v-model:open="isOpen" title='Convidar Usuário' description="Convite um novo usuário para o grupo">
    <UButton variant="outline" @click="isOpen = true" icon="mdi:plus">Convidar</UButton>

    <template #body>
      <div class="modal-card">
        <UForm :schema="schema" :state="formState" @submit="handleSubmit">
          <div class="form-group">
            <label>Username</label>
            <UInput v-model="formState.username" placeholder="Username" disabled />
          </div>

          <div class="form-group">
            <label>Primeiro Nome</label>
            <UInput v-model="formState.first_name" placeholder="Primeiro Nome" />
          </div>

          <div class="form-group">
            <label>Segundo Nome</label>
            <UInput v-model="formState.last_name" placeholder="Segundo Nome" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <UInput v-model="formState.email" placeholder="Email" type="email" />
          </div>

          <div class="form-group">
            <label>Permissão</label>
            <USelect v-model="formState.role" :items="['COODINATOR', 'TEACHER']" />
          </div>

          <div class="flex justify-end w-full gap-2 mt-2">
            <UButton variant="outline" @click="isOpen = false">Cancelar</UButton>
            <UButton type="submit" loading-auto>Convidar</UButton>
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
