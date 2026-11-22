import { authController, selectUser, type User } from "@/entities/user";
import { Block, connect, openModal } from "@/shared/lib";
import template from "./settings-page.hbs?raw";

interface Props {
  user: User | null;
  backHref: string;
  isEdit?: boolean;
  isPassword?: boolean;
}

class SettingsPageBase extends Block<Props> {
  protected override template = template;

  private handleAvatarClick = () => openModal("change-avatar");

  private handleLogoutClick = () => authController.logout();

  protected override componentDidMount() {
    this.refs.avatarButton?.addEventListener("click", this.handleAvatarClick);
    this.refs.logoutButton?.addEventListener("click", this.handleLogoutClick);
  }

  protected override componentWillUnmount() {
    this.refs.avatarButton?.removeEventListener("click", this.handleAvatarClick);
    this.refs.logoutButton?.removeEventListener("click", this.handleLogoutClick);
  }
}

const withUser = connect((state) => ({ user: selectUser(state) }));

export const SettingsPage = withUser(SettingsPageBase);
