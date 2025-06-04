<script lang="ts" setup>
import { UContainer } from '#components';
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod';

const { login, state, getError } = useAuth();

const schema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(12, 'Deve ter pelo menos 12 caracteres')
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ name: 'username', message: 'Insira o nome do usuário' })
  if (!state.password) errors.push({ name: 'password', message: 'Insira uma senha.' })
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
    <UContainer>
      <UForm :schema="schema" :validate="validate" :state="formState" @submit="onSubmit" class="login-form">
        <UFormField label="Email" name="username" class="form-field">
          <UInput v-model="formState.username" type="text" class="form-input" placeholder="Email" />
        </UFormField>

        <UFormField label="Senha" name="password" class="form-field">
          <UInput v-model="formState.password" type="password" class="form-input" placeholder="Senha" />
        </UFormField>

        <UButton type="submit" class="login-submit">
          Entrar
        </UButton>
      </UForm>
    </UContainer>
  </main>
</template>

<style>
.logo {
  height: 60px;
  width: 60px;
}

.login-form {
  width: 18dvw;
  padding: calc(var(--spacing) * 4.5);
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