import { Block } from "@/shared/lib";
import { Input } from "../input";

export type FormValues = Record<string, FormDataEntryValue>;

export abstract class Form<Props extends object = object> extends Block<Props> {
  protected override events = {
    submit: (event: Event) => this.handleSubmit(event),
  };

  protected abstract onSubmit(data: FormValues): void;

  protected validate(): boolean {
    return this.children
      .filter((child): child is Input => child instanceof Input)
      .map((input) => input.validate())
      .every(Boolean);
  }

  private handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    if (!this.validate()) {
      return;
    }

    this.onSubmit(Object.fromEntries(new FormData(form)));
  }
}
