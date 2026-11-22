import { ROUTES } from "../config";
import { router, store } from "../lib";
import { NetworkError, ServerError, UnauthorizedError } from "./errors";

export function redirectOnFatalError(error: unknown): boolean {
  if (error instanceof UnauthorizedError && store.getState().user) {
    store.set("user", null);
    router.go(ROUTES.LOGIN);
    return true;
  }

  if (error instanceof ServerError || error instanceof NetworkError) {
    router.go(ROUTES.SERVER_ERROR);
    return true;
  }

  return false;
}

export function handleApiError(error: unknown): never {
  redirectOnFatalError(error);

  throw error;
}
