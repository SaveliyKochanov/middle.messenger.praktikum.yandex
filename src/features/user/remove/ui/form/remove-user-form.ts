import { chatController } from "@/entities/chat";
import { Form, type FormValues } from "@/shared/ui";
import template from "./remove-user-form.hbs?raw";

export class RemoveUserForm extends Form {
  static override componentName = "RemoveUserForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    chatController.removeUser(data);

    const form = this.element();

    if (form instanceof HTMLFormElement) {
      form.reset();
      form.closest("dialog")?.close();
    }
  }
}
