import { User } from "~/shared/types/auth/user";
import { UserLogin } from "~/shared/types/auth/user-login";

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody<UserLogin>(event);

  try {
    return await event.$fetch<User>("/auth/login", {
      method: "POST",
      baseURL: config.API_ENDPOINT,
      body: body,
      onResponse(ctx) {
        appendResponseHeaders(event, {
          "set-cookie": ctx.response.headers.getSetCookie(),
        });
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
