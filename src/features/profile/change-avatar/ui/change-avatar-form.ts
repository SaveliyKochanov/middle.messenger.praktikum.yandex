import { userController } from "@/entities/user";
import { Form, type FormValues } from "@/shared/ui";
import template from "./change-avatar-form.hbs?raw";

export class ChangeAvatarForm extends Form {
  static override componentName = "ChangeAvatarForm";

  protected override template = template;

  protected override async onSubmit(data: FormValues) {
    await userController.changeAvatar(data);

    const form = this.element();

    if (form instanceof HTMLFormElement) {
      form.reset();
      form.closest("dialog")?.close();
    }
  }
}
