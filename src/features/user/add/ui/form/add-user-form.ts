import { chatController } from "@/entities/chat";
import { Form, type FormValues } from "@/shared/ui";
import template from "./add-user-form.hbs?raw";

export class AddUserForm extends Form {
  static override componentName = "AddUserForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    chatController.addUser(data);

    const form = this.element();

    if (form instanceof HTMLFormElement) {
      form.reset();
      form.closest("dialog")?.close();
    }
  }
}
