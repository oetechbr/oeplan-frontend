<script setup lang="ts">
const { state } = useAuth();

const message =
  state.value.user!.status === 'SUSPENDED'
    ? 'Sua conta está temporariamente suspensa.'
    : 'Sua conta está inativa no momento.'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UCard class="max-w-md w-full text-center" variant="subtle">
      <template #header>
        <div class="flex flex-col items-center gap-2">
          <Icon name="mdi:alert-circle-outline" size="36" class="text-error" />
          <h1 class="text-2xl font-bold">Acesso Restrito</h1>
        </div>
      </template>

      <p class="text-muted mb-4">{{ message }}</p>

      <UAlert color="error" variant="soft" icon="i-mdi-information-outline" title="Precisa de ajuda?"
        description="Entre em contato com nosso suporte para resolver essa situação." class="mb-4 text-start" />
    </UCard>
  </div>
</template>
