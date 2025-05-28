import { createError, getQuery, useRuntimeConfig } from "#imports";

export default defineCachedHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);

  try {
    return await event.$fetch("/tasks", {
      baseURL: config.API_ENDPOINT,
      params: {
        ...query,
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
