export default defineNuxtRouteMiddleware((to) => {
  const { state } = useAuth();
  const routes = ["/login/", "/"];

  if (state.value.isLoggedIn) {
    if (routes.includes(to.path)) return navigateTo("/board/");
    return;
  }

  if (to.path === "/login/") return;

  return navigateTo("/login/");
});
