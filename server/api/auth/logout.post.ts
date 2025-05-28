export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    return await event.$fetch("/auth/logout", {
      method: "POST",
      baseURL: config.API_ENDPOINT,
      onResponse() {
        deleteCookie(event, "SESSION_ID");
      },
    });
  } catch (e: any) {
    const status = e.status || 500;
    throw createError({
      statusCode: status,
      message: e.message || "Something went wrong",
    });
  }
});
