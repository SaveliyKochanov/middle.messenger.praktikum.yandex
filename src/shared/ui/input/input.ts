import { Block, validateField } from "@/shared/lib";
import template from "./input.hbs?raw";

interface Props {
  name: string;
  id?: string;
  label?: string;
  type?: string;
  value?: string;
  error?: string;
  placeholder?: string;
  autocomplete?: string;
  variant?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export class Input extends Block<Props> {
  static override componentName = "Input";

  protected override template = template;

  private handleBlur = () => this.validate();

  protected override componentDidMount() {
    this.refs.field?.addEventListener("blur", this.handleBlur);
  }

  protected override componentWillUnmount() {
    this.refs.field?.removeEventListener("blur", this.handleBlur);
  }

  public validate(): boolean {
    const field = this.refs.field;

    if (!(field instanceof HTMLInputElement)) {
      return true;
    }

    const value = field.value;
    const error = validateField(this.props.name, value) ?? "";

    if (value !== this.props.value || error !== (this.props.error ?? "")) {
      this.setProps({ value, error });
    }

    return !error;
  }
}
