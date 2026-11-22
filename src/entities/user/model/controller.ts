import { handleApiError } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { router, store, ValidationError } from "@/shared/lib";
import { getField, type FormValues } from "@/shared/ui";
import { userAPI } from "../api";

class UserController {
  public async updateProfile(data: FormValues) {
    try {
      const user = await userAPI.updateProfile({
        first_name: getField(data, "first_name"),
        second_name: getField(data, "second_name"),
        display_name: getField(data, "display_name"),
        login: getField(data, "login"),
        email: getField(data, "email"),
        phone: getField(data, "phone"),
      });

      store.set("user", user);
    } catch (error) {
      handleApiError(error);
    }

    router.go(ROUTES.SETTINGS);
  }

  public async changePassword(data: FormValues) {
    const newPassword = getField(data, "newPassword");

    if (newPassword !== getField(data, "newPasswordRepeat")) {
      throw new ValidationError("Пароли не совпадают");
    }

    try {
      await userAPI.updatePassword({
        oldPassword: getField(data, "oldPassword"),
        newPassword,
      });
    } catch (error) {
      handleApiError(error);
    }

    router.go(ROUTES.SETTINGS);
  }

  public async changeAvatar(data: FormValues) {
    const { avatar } = data;

    if (!(avatar instanceof File) || avatar.size === 0) {
      throw new ValidationError("Выберите файл");
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const user = await userAPI.updateAvatar(formData);
      store.set("user", user);
    } catch (error) {
      handleApiError(error);
    }
  }
}

export const userController = new UserController();
