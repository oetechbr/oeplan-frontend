<script lang="ts" setup>

const { validateInvite, state, getError } = useAuth();
const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const tokenState = ref<"missing" | "invalid">();

async function validate() {
  if (route.query.token === null || route.query.token === undefined) {
    isLoading.value = false;
    tokenState.value = "missing";
    return;
  }

  await validateInvite(route.query.token as string)

  const error = getError()
  if (error) {
    alert(error.message);
    isLoading.value = false;
    return;
  }

  if (state.value.isLoggedIn && state.value.user) {
    return router.push("/finish-signup")
  }
}

onMounted(async () => {
  await validate();
})
</script>

<template>
  <main>
    <UCard class="text-center py-10" variant="subtle">
      <div v-if="isLoading">
        <h1 class="text-xl font-semibold mb-2">Verificando...</h1>
        <p class="text-muted">Aguarde enquanto verificamos seu token.</p>
        <div class="animate-spin rounded-full border-4 border-t-transparent border-primary w-8 h-8 mx-auto my-4"></div>
      </div>

      <div v-else-if="tokenState === 'missing'">
        <div class="w-fit m-auto flex align-center justify-center mb-2">
          <UIcon name="mdi:alert-circle" class="mx-auto text-warning" size="30" />
        </div>
        <h1 class="text-xl font-semibold mb-2">Nenhum token encontrado</h1>
        <p class="text-muted mb-4">
          O link de verificação não possui o token.
          <br>
          Verifique a URL ou solicite um novo link.
        </p>
      </div>

      <div v-else="tokenState === 'invalid'">
        <div class="w-fit m-auto flex align-center justify-center mb-2">
          <UIcon name="mdi:close-circle" class="text-error mx-auto" size="30" />
        </div>
        <h1 class="text-xl font-semibold mb-2">Token inválido ou expirado</h1>
        <p class="text-muted mb-4">
          O token é inválido ou expirou.
          <br>
          Solicite um novo link de verificação.
        </p>
      </div>
    </UCard>
  </main>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>