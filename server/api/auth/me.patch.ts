import { User } from "~/shared/types/auth/user";
import { UserPatch } from "~/shared/types/auth/user-patch";

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody<UserPatch>(event);

  try {
    return await event.$fetch<User>("/auth/me", {
      method: "PATCH",
      credentials: "include",
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
