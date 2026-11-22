import { ROUTES } from "@/shared/config";
import { router } from "@/shared/lib";
import type { FormValues } from "@/shared/ui";
import { userService, type UserFields } from "./service";

class UserController {
  public getUser() {
    return userService.getUser();
  }

  public login(data: FormValues) {
    console.log(data);
    router.go(ROUTES.MESSENGER);
  }

  public register(data: FormValues) {
    console.log(data);
    router.go(ROUTES.MESSENGER);
  }

  public updateProfile(data: FormValues) {
    console.log(data);

    const fields: UserFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => typeof value === "string")
    );

    userService.update(fields);
    router.go(ROUTES.SETTINGS);
  }

  public changePassword(data: FormValues) {
    console.log(data);
    router.go(ROUTES.SETTINGS);
  }

  public changeAvatar(data: FormValues) {
    console.log(data);

    const { avatar } = data;

    if (avatar instanceof File && avatar.size > 0) {
      userService.setAvatar(URL.createObjectURL(avatar));
    }

    router.go(ROUTES.SETTINGS);
  }
}

export const userController = new UserController();
