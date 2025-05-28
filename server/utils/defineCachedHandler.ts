import { defineCachedEventHandler, useRuntimeConfig } from "#imports";
import { H3Event } from "h3";

/**
 * Wrapper for `defineCachedEventHandler` that validates runtime configuration before proceeding and caches the data.
 * @param handler - The actual event handler function.
 * @returns The wrapped event handler (with cache).
 */
export function defineCachedHandler(
  handler: (event: H3Event, config: ReturnType<typeof useRuntimeConfig>) => any
) {
  return defineCachedEventHandler(
    (event) => {
      const config = useRuntimeConfig(event);

      if (!config.API_ENDPOINT) {
        throw new Error("API_ENDPOINT key is not set");
      }

      return handler(event, config);
    },
    {
      maxAge: 60 * 5 /* 1 hour */,
      varies: ["cookie"],
    }
  );
}
