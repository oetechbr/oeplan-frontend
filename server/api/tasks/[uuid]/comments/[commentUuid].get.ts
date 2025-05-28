import { createError, useRuntimeConfig } from "#imports";

export default defineCachedHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const uuid = getRouterParam(event, "uuid");
  const commentUuid = getRouterParam(event, "commentUuid");

  try {
    return await event.$fetch(`/${uuid}/comments/${commentUuid}`, {
      baseURL: config.API_ENDPOINT,
    });
  } catch (e: any) {
    const status = e.status || 500;
    throw createError({
      statusCode: status,
      message: e.message || "Something went wrong",
    });
  }
});
