export default defineNuxtRouteMiddleware((to) => {
  const { state } = useAuth();

  if (state.value.isLoggedIn && state.value.user) {
    if (["ADMIN", "DIRECTOR"].includes(state.value.user.role)) {
      return;
    }

    return navigateTo("/board/groups/");
  }
});
