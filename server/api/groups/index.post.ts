import { createError, useRuntimeConfig } from "#imports";
import { defineSimpleHandler } from "~/server/utils/defineSimpleHandler";

export default defineSimpleHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  try {
    return await event.$fetch("/groups", {
      baseURL: config.AS_API,
      method: "POST",
      body,
    });
  } catch (e: any) {
    const status = e.status || 500;
    throw createError({
      statusCode: status,
      message: e.message || "Something went wrong",
    });
  }
});
