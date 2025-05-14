import { defineSimpleHandler } from "~/server/utils/defineSimpleHandler";
import { User } from "~/shared/types/auth/user";

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    return await event.$fetch<User>("/auth/me", {
      baseURL: config.API_ENDPOINT,
      credentials: "include",
    });
  } catch (e: any) {
    const status = e.status || 500;
    throw createError({
      statusCode: status,
      message: e.message || "Something went wrong",
    });
  }
});
