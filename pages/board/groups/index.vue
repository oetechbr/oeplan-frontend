<script lang="ts" setup>
import type { Group } from '~/shared/types/group';

const { state } = useAuth();

definePageMeta({
  layout: 'dashboard'
})

const { data: groups, status } = useLazyFetch<Group[]>(() => {
  return `/api/groups`;
});
</script>

<template>
  <div class="board-main flex flex-col gap-4">
    <div class="rounded-lg bg-elevated/50 ring ring-default divide-y divide-default p-4">
      <h1 class="text-xl font-bold">Olá, {{ state.user?.first_name }}</h1>
    </div>

    <div v-if="status !== 'pending'">
      <div class="groups-section">
        <div class="groups-header">
          <div class="header-info">
            <h2 class="text-xl font-bold">Groupos:</h2>
            <p class="groups-description">Visualize e gerencie todos os cursos</p>
          </div>
          <div class="header-actions">
            <GroupCreateModal />
          </div>
        </div>
        <div class="groups-grid">
          <GroupCard v-for="group in groups" :data="group" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-main {
  width: 100%;
}

.groups-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.groups-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.groups-title {
  font-size: 1.5em;
  font-weight: bold;
}

.groups-description {
  font-size: 0.9em;
  color: var(--color-text-secondary);
}

.groups-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>