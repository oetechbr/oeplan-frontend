<script lang="ts" setup>
const { state } = useAuth();

definePageMeta({
  middleware: 'authenticated',
  layout: 'dashboard'
})
</script>

<template>
  <div class="board-main">
    Hello World, {{ state.user?.first_name }} !
  </div>
</template>

<style scoped>
.board-main {
  width: 100%;
}
</style>