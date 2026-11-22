import { HTTPError, NetworkError } from "@/shared/api";
import { Block, ValidationError } from "@/shared/lib";
import { Input } from "../input";

export type FormValues = Record<string, FormDataEntryValue>;

export function getField(data: FormValues, name: string): string {
  const value = data[name];

  return typeof value === "string" ? value : "";
}

function getErrorMessage(error: unknown): string | null {
  if (error instanceof HTTPError) {
    return error.reason;
  }

  if (error instanceof NetworkError || error instanceof ValidationError) {
    return error.message;
  }

  return null;
}

export abstract class Form<Props extends object = object> extends Block<Props> {
  protected override events = {
    submit: (event: Event) => this.handleSubmit(event),
  };

  protected abstract onSubmit(data: FormValues): void | Promise<void>;

  protected validate(): boolean {
    return this.children
      .filter((child): child is Input => child instanceof Input)
      .map((input) => input.validate())
      .every(Boolean);
  }

  protected showError(message: string) {
    const element = this.refs.formError;

    if (element) {
      element.textContent = message;
    }
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    if (!this.validate()) {
      return;
    }

    this.showError("");

    try {
      await this.onSubmit(Object.fromEntries(new FormData(form)));
    } catch (error) {
      const message = getErrorMessage(error);

      if (message === null) {
        throw error;
      }

      this.showError(message);
    }
  }
}
