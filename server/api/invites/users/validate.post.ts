import { User } from "~/shared/types/auth/user";

interface ValidateModel {
  token: string;
}

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody<ValidateModel>(event);

  try {
    return await $fetch<User>(`/invites/users/validate?token=${body.token}`, {
      method: "POST",
      baseURL: config.API_ENDPOINT,
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
