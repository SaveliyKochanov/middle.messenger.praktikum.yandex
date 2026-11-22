import { Block } from "@/shared/lib";
import template from "./navigation-page.hbs?raw";

interface Props {
  links: Array<{ href: string; text: string }>;
}

export class NavigationPage extends Block<Props> {
  protected override template = template;
}
