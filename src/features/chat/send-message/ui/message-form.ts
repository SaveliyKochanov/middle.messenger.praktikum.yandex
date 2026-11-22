import { messageController } from "@/entities/message";
import { validateField } from "@/shared/lib";
import { Form, type FormValues } from "@/shared/ui";
import template from "./message-form.hbs?raw";

export class MessageForm extends Form {
  static override componentName = "MessageForm";

  protected override template = template;

  protected override validate(): boolean {
    const field = this.refs.field;

    if (!(field instanceof HTMLInputElement)) {
      return false;
    }

    return !validateField(field.name, field.value);
  }

  protected override onSubmit(data: FormValues) {
    messageController.sendMessage(data);

    const field = this.refs.field;

    if (field instanceof HTMLInputElement) {
      field.value = "";
    }
  }
}
