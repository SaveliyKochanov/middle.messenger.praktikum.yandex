import { Block } from "@/shared/lib";
import template from "./modal.hbs?raw";

interface Props {
  id: string;
  title?: string;
  className?: string;
  content?: string;
}

export class Modal extends Block<Props> {
  static override componentName = "Modal";

  protected override template = template;

  protected override events = {
    click: (event: Event) => this.closeOnBackdrop(event),
  };

  private closeOnBackdrop(event: Event) {
    const dialog = this.element();

    if (dialog instanceof HTMLDialogElement && event.target === dialog) {
      dialog.close();
    }
  }
}
