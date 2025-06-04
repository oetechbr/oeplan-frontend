import { InviteUser } from "~/shared/types/invite-user";

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody<InviteUser>(event);

  try {
    return await event.$fetch("/invites/users/generate", {
      method: "POST",
      baseURL: config.API_ENDPOINT,
      body,
    });
  } catch (e: any) {
    const status = e.status || 500;
    console.log(e);
    throw createError({
      statusCode: status,
      message: e.message || "Something went wrong",
    });
  }
});
