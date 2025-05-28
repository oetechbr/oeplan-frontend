import { useRuntimeConfig } from "#imports";
import { H3Event } from "h3";

/**
 * Wrapper for `defineEventHandler` that validates runtime configuration before proceeding.
 * @param handler - The actual event handler function.
 * @returns The wrapped event handler.
 */
export function defineSimpleHandler(
  handler: (event: H3Event, config: ReturnType<typeof useRuntimeConfig>) => any
) {
  return defineEventHandler((event) => {
    const config = useRuntimeConfig(event);

    if (!config.API_ENDPOINT) {
      throw new Error("API_ENDPOINT key is not set");
    }

    return handler(event, config);
  });
}
