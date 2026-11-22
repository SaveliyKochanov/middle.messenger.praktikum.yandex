import { chatController } from "@/entities/chat";
import { Form, type FormValues } from "@/shared/ui";
import template from "./create-chat-form.hbs?raw";

export class CreateChatForm extends Form {
  static override componentName = "CreateChatForm";

  protected override template = template;

  protected override async onSubmit(data: FormValues) {
    await chatController.createChat(data);

    const form = this.element();

    if (form instanceof HTMLFormElement) {
      form.reset();
      form.closest("dialog")?.close();
    }
  }
}
