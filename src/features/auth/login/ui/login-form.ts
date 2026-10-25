import { userController } from "@/entities/user";
import { Form, type FormValues } from "@/shared/ui";
import template from "./login-form.hbs?raw";

export class LoginForm extends Form {
  static override componentName = "LoginForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    userController.login(data);
  }
}
