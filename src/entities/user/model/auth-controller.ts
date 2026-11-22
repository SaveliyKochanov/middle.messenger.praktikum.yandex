import { BadRequestError, handleApiError, redirectOnFatalError, UnauthorizedError } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { router, store, ValidationError } from "@/shared/lib";
import { getField, type FormValues } from "@/shared/ui";
import { authAPI } from "../api";

const ALREADY_SIGNED_IN = "User already in system";

class AuthController {
  public async fetchUser() {
    try {
      const user = await authAPI.getUser();
      store.set("user", user);
    } catch (error) {
      store.set("user", null);

      if (!(error instanceof UnauthorizedError)) {
        throw error;
      }
    }
  }

  public async signUp(data: FormValues) {
    const password = getField(data, "password");

    if (password !== getField(data, "password_repeat")) {
      throw new ValidationError("Пароли не совпадают");
    }

    try {
      await authAPI.signUp({
        first_name: getField(data, "first_name"),
        second_name: getField(data, "second_name"),
        login: getField(data, "login"),
        email: getField(data, "email"),
        phone: getField(data, "phone"),
        password,
      });

      await this.fetchUser();
    } catch (error) {
      handleApiError(error);
    }

    router.go(ROUTES.MESSENGER);
  }

  public async signIn(data: FormValues) {
    try {
      await authAPI.signIn({
        login: getField(data, "login"),
        password: getField(data, "password"),
      });
    } catch (error) {
      if (!(error instanceof BadRequestError && error.reason === ALREADY_SIGNED_IN)) {
        handleApiError(error);
      }
    }

    try {
      await this.fetchUser();
    } catch (error) {
      handleApiError(error);
    }

    router.go(ROUTES.MESSENGER);
  }

  public async logout() {
    try {
      await authAPI.logout();
    } catch (error) {
      if (redirectOnFatalError(error)) {
        return;
      }

      throw error;
    }

    store.set("user", null);
    store.set("chats", []);
    store.set("activeChatId", null);

    router.go(ROUTES.LOGIN);
  }
}

export const authController = new AuthController();
