<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

const { state } = useAuth();
const toast = useToast()

const formState = reactive<Partial<Schema>>({
  ...state.value.user,
  birth_date: state.value.user?.birth_date.split("T")[0]
})

type Schema = z.output<typeof schema>

// Validation schema
const schema = z.object({
  phone: z.string().optional(),
  gender: z.string().optional(),
  birth_date: z.string().optional(),
  department: z.string().optional(),
  title_position: z.string().optional()
});

const genders = ['Male', 'Female', 'Other']

async function updateUserInfo(data: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
}
</script>

<template>
  <UCard class="min-w-100 flex flex-col gap-2" variant="subtle">
    <h1 class="text-xl font-semibold mb-2">Atualize os seus dados</h1>

    <UForm :state="formState" class="w-full space-y-4" @submit="updateUserInfo">
      <UFormField class="form-group" label="Telefone" name="phone">
        <UInput v-model="formState.phone" placeholder="+1234567890" type="tel" class="w-full" />
      </UFormField>

      <UFormField class="form-group" label="Gênero" name="gender">
        <USelect v-model="formState.gender" :items="genders" placeholder="Select gender" class="w-full" />
      </UFormField>

      <UFormField class="form-group" label="Data de nascimento" name="birth_date">
        <UInput v-model="formState.birth_date" type="date" class="w-full" />
      </UFormField>

      <UFormField class="flex gap-2 justify-end">
        <UButton type="submit">Atualizar</UButton>
      </UFormField>
    </UForm>
  </UCard>
</template>