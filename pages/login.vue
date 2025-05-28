<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';

const { login, state, getError } = useAuth();

definePageMeta({
  middleware: 'authenticated',
})

const schema = z.object({
  username: z.string().nonempty({ message: 'Por favor, insira o nome do usuário' }),
  password: z.string().min(12, 'Deve ter pelo menos 12 caracteres')
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ name: 'username', message: 'Por favor, insira o nome do usuário' })
  return errors
}

type Schema = z.output<typeof schema>

const formState = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined
})

const toast = useToast()
async function onSubmit(e: FormSubmitEvent<Schema>) {
  await login(e.data);

  const error = getError()
  if (error) {
    alert(error.message);
    return;
  }

  if (state.value.isLoggedIn) {
    await navigateTo("/board/");
  }

  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
}
</script>

<template>
  <main>
    <Icon name="oeplan:logo" class="logo" />
    <div class="login">
      <UForm :schema="schema" :validate="validate" :state="formState" @submit="onSubmit" class="login-form">
        <UFormField label="Username" name="username" class="form-field">
          <UInput v-model="formState.username" class="form-input" />
        </UFormField>

        <UFormField label="Password" name="password" class="form-field">
          <UInput v-model="formState.password" type="password" class="form-input" />
        </UFormField>

        <UButton type="submit" size="md" class="login-submit">
          Login
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<style>
main {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 60px;
  width: 60px;
}

.login-form {
  width: 18dvw;
  background-color: var(--color-surface);
  padding: var(--spacing-xl);
  border-radius: var(--br-md);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-field {
  width: 100%;
}

.form-input {
  width: 100%;
}

.login-submit {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>