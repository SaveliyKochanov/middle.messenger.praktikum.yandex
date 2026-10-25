import { ROUTES } from "@/shared/config";
import { navigate } from "@/shared/lib";
import type { FormValues } from "@/shared/ui";
import { userService, type UserFields } from "./service";

class UserController {
  public getUser() {
    return userService.getUser();
  }

  public login(data: FormValues) {
    console.log(data);
    navigate(ROUTES.MESSENGER);
  }

  public register(data: FormValues) {
    console.log(data);
    navigate(ROUTES.MESSENGER);
  }

  public updateProfile(data: FormValues) {
    console.log(data);

    const fields: UserFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => typeof value === "string")
    );

    userService.update(fields);
    navigate(ROUTES.SETTINGS);
  }

  public changePassword(data: FormValues) {
    console.log(data);
    navigate(ROUTES.SETTINGS);
  }

  public changeAvatar(data: FormValues) {
    console.log(data);

    const { avatar } = data;

    if (avatar instanceof File && avatar.size > 0) {
      userService.setAvatar(URL.createObjectURL(avatar));
    }

    navigate(ROUTES.SETTINGS);
  }
}

export const userController = new UserController();
