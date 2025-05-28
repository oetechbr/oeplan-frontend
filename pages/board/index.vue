<script lang="ts" setup>
const { state } = useAuth();

definePageMeta({
  middleware: 'authenticated',
})
</script>

<template>
  <div>
    Hello World, {{ state.user?.first_name }} !
  </div>
</template>

<style></style>