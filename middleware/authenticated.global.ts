export default defineNuxtRouteMiddleware((to) => {
  const { state } = useAuth();
  const alloedRoutes = ["/verify-token/"];

  if (alloedRoutes.includes(to.path)) {
    return;
  }

  if (state.value.isLoggedIn && state.value.user) {
    if (state.value.user.status === "INCOMPLETE") {
      if (to.path === "/finish-signup/") return;
      return navigateTo("/finish-signup/");
    }

    if (["SUSPENDED", "INACTIVE"].includes(state.value.user.status)) {
      if (to.path === "/account-disabled/") return;
      return navigateTo("/account-disabled/");
    }

    if (to.path === "/login/") {
      switch (state.value.user.role) {
        case "DIRECTOR":
        case "ADMIN":
          return navigateTo("/board/");
        case "TEACHER":
        case "COORDINATOR":
          return navigateTo("/board/groups/");
      }
    }

    return;
  }

  if (to.path === "/login/") return;

  return navigateTo("/login/");
});
