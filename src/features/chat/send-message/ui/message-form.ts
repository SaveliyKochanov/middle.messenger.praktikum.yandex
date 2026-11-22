import { validateField } from "@/shared/lib";
import { Form } from "@/shared/ui";
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

  protected override onSubmit() {
    const field = this.refs.field;

    if (field instanceof HTMLInputElement) {
      field.value = "";
    }
  }
}
