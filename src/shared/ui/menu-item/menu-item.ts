import { Block, openModal } from "@/shared/lib";
import template from "./menu-item.hbs?raw";

interface Props {
  text: string;
  modal?: string;
  className?: string;
  content?: string;
}

export class MenuItem extends Block<Props> {
  static override componentName = "MenuItem";

  protected override template = template;

  protected override events = {
    click: () => this.handleClick(),
  };

  private handleClick() {
    if (!this.props.modal) {
      return;
    }

    this.element()?.closest<HTMLElement>("[popover]")?.hidePopover();
    openModal(this.props.modal);
  }
}
