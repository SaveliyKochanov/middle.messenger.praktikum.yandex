import { Block } from "@/shared/lib";
import template from "./message.hbs?raw";

interface Props {
  text: string;
  time: string;
  my?: boolean;
  checked?: boolean;
}

export class Message extends Block<Props> {
  static override componentName = "Message";

  protected override template = template;
}
