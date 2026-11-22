import { userController } from "@/entities/user";
import { Form, type FormValues } from "@/shared/ui";
import template from "./change-avatar-form.hbs?raw";

export class ChangeAvatarForm extends Form {
  static override componentName = "ChangeAvatarForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    userController.changeAvatar(data);
  }
}
