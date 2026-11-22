import { userController } from "@/entities/user";
import { Form, type FormValues } from "@/shared/ui";
import template from "./register-form.hbs?raw";

export class RegisterForm extends Form {
  static override componentName = "RegisterForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    userController.register(data);
  }
}
