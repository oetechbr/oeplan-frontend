<template>
  <div class="dashboard">
    <DashboardHeader />
    <main>
      <div class="dashboard-container">
        <div class="dashboard-content">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100%;
  background-color: var(--color-surface);
  margin: 0;
  padding: 0;
}

.dashboard {
  display: flex;
}

.dashboard-container {
  height: 100%;
  width: 100%;
}

.dashboard-content {
  height: 100%;
  width: 100%;
  max-width: var(--max-width);
  background-color: white;
  border-radius: var(--border-radius-md);
  margin: 0 auto;
  padding: var(--width-padding);
  padding-top: calc(var(--header-height) + 1rem);
  display: flex;
  justify-content: center;
}
</style>