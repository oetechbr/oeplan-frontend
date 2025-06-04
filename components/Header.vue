<script lang="ts" setup>
import UserProfileModal from './UserProfileModal.vue';
</script>

<template>
  <header class="ring ring-default divide-y divide-default">
    <div class="container">
      <NuxtLink to="/" class="logo-container">
        <Icon name="oeplan:logo" class="logo" />
      </NuxtLink>

      <div class="flex gap-6">
        <NuxtLink to="/board/" class="nav-link" exact>Início</NuxtLink>
        <NuxtLink to="/board/tasks/" class="nav-link">Tarefas</NuxtLink>
        <NuxtLink to="/board/groups/" class="nav-link">Grupos</NuxtLink>
      </div>

      <div class="flex gap-2 items-center justify-center">
        <SearchModal />
        <UserProfileModal />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  border-bottom: 1px solid var(--color-border);
  z-index: 99;
}

.logo {
  height: 40px;
  width: 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 50px;
}

.container {
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: space-between;
  padding: 0 var(--screen-min-width-padding);
  position: relative;
}

.container h3 {
  height: 100%;
  width: 100%;
  align-content: center;
  margin: 0;
}

@media (max-width: 1024px) {
  header {
    margin-left: 0;
  }

  .container h3 {
    text-align: center;
  }

  .header-logo {
    display: none;
  }
}

/* Nav Links */
.nav-link {
  position: relative;
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--color-primary-500);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: var(--color-primary-500);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.router-link-exact-active.nav-link::after {
  width: 100%;
}
</style>