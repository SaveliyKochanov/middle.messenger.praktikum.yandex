import { Block } from "@/shared/lib";
import template from "./button.hbs?raw";

interface Props {
  text: string;
  type?: "button" | "submit";
  variant?: string;
  className?: string;
  onClick?: (event: Event) => void;
}

export class Button extends Block<Props> {
  static override componentName = "Button";

  protected override template = template;

  protected override events = {
    click: (event: Event) => this.props.onClick?.(event),
  };
}
