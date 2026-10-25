import { Block } from "@/shared/lib";
import template from "./server-error-page.hbs?raw";

export class ServerErrorPage extends Block<object> {
  protected override template = template;
}
