import { userController } from "@/entities/user";
import { Form, type FormValues } from "@/shared/ui";
import template from "./edit-profile-form.hbs?raw";

export class EditProfileForm extends Form {
  static override componentName = "EditProfileForm";

  protected override template = template;

  protected override onSubmit(data: FormValues) {
    userController.updateProfile(data);
  }
}
