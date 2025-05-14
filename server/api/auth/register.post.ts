import { UserRegister } from "~/shared/types/auth/user-register";

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody<UserRegister>(event);

  try {
    return await $fetch("/auth/register", {
      method: "POST",
      baseURL: config.API_ENDPOINT,
      body: body,
    });
  } catch (e: any) {
    const status = e.status || 500;
    throw createError({
      statusCode: status,
      message: e,
    });
  }
});
