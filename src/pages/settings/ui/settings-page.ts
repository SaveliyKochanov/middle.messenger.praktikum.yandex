import type { User } from "@/entities/user/api";
import { userController } from "@/entities/user";
import { Block, openModal } from "@/shared/lib";
import template from "./settings-page.hbs?raw";

interface Props {
  user: User;
  backHref: string;
  isEdit?: boolean;
  isPassword?: boolean;
}

export class SettingsPage extends Block<Props> {
  constructor(props: Omit<Props, "user">) {
    super({ ...props, user: userController.getUser() });
  }

  protected override template = template;

  private handleAvatarClick = () => openModal("change-avatar");

  protected override componentDidMount() {
    this.refs.avatarButton?.addEventListener("click", this.handleAvatarClick);
  }

  protected override componentWillUnmount() {
    this.refs.avatarButton?.removeEventListener("click", this.handleAvatarClick);
  }
}
