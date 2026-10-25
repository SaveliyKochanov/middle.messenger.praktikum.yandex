import { userController } from "@/entities/user";
import { Form, type FormValues } from "@/shared/ui";
import template from "./change-password-form.hbs?raw";

export class ChangePasswordForm extends Form {
  static override componentName = "ChangePasswordForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    userController.changePassword(data);
  }
}
