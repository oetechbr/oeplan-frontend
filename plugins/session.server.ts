import { useAuth } from "~/composables/auth";

export default defineNuxtPlugin(async () => {
  const { initState, getError, logout } = useAuth();

  await initState();
  if (getError()) {
    await logout();
  }
});
