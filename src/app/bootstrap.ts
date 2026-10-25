import Handlebars from "handlebars";
import "./css/index.scss";

import { ROUTES } from "@/shared/config";
import { Block, navigate, registerComponent } from "@/shared/lib";

import {
  Input,
  Button,
  Avatar,
  Badge,
  SearchField,
  IconChecked,
  IconAttach,
  IconArrow,
  IconSearch,
  IconProfile,
  IconPlus,
  IconCross,
  Modal,
  MenuItem,
  ErrorScreen
} from "@/shared/ui";

import { ChatItem } from "@/entities/chat";
import { Message } from "@/entities/message";
import { UserInfo } from "@/entities/user";

import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";
import { SearchChat } from "@/features/chat/search";
import { MessageForm } from "@/features/chat/send-message";
import { AttachFileButton } from "@/features/chat/attach-file";
import { AddUserButton, AddUserModal, AddUserForm } from "@/features/user/add";
import { RemoveUserButton, RemoveUserModal, RemoveUserForm } from "@/features/user/remove";
import { EditProfileForm } from "@/features/profile/edit-profile";
import { ChangePasswordForm } from "@/features/profile/change-password";
import { ChangeAvatarForm } from "@/features/profile/change-avatar";

import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { MessengerPage } from "@/pages/messenger";
import { NotFoundPage } from "@/pages/not-found";
import { SettingsPage } from "@/pages/settings";
import { ServerErrorPage } from "@/pages/server-error";
import { NavigationPage } from "@/pages/navigation";

import { ChatSidebar } from "@/widgets/chat-sidebar";
import { ChatWindow, ChatWindowHeader, ChatWindowMessages } from "@/widgets/chat-window";

Handlebars.registerHelper("route", (name: keyof typeof ROUTES) => ROUTES[name]);

// shared ui
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("Badge", Badge);
Handlebars.registerPartial("SearchField", SearchField);
Handlebars.registerPartial("IconChecked", IconChecked);
Handlebars.registerPartial("IconAttach", IconAttach);
Handlebars.registerPartial("IconArrow", IconArrow);
Handlebars.registerPartial("IconSearch", IconSearch);
Handlebars.registerPartial("IconProfile", IconProfile);
Handlebars.registerPartial("IconPlus", IconPlus);
Handlebars.registerPartial("IconCross", IconCross);
Handlebars.registerPartial("ErrorScreen", ErrorScreen);

// entities
Handlebars.registerPartial("ChatItem", ChatItem);
Handlebars.registerPartial("UserInfo", UserInfo);

// widgets
Handlebars.registerPartial("ChatSidebar", ChatSidebar);
Handlebars.registerPartial("ChatWindow", ChatWindow);
Handlebars.registerPartial("ChatWindowHeader", ChatWindowHeader);
Handlebars.registerPartial("ChatWindowMessages", ChatWindowMessages);

// features
Handlebars.registerPartial("SearchChat", SearchChat);
Handlebars.registerPartial("AttachFileButton", AttachFileButton);
Handlebars.registerPartial("AddUserButton", AddUserButton);
Handlebars.registerPartial("AddUserModal", AddUserModal);
Handlebars.registerPartial("RemoveUserButton", RemoveUserButton);
Handlebars.registerPartial("RemoveUserModal", RemoveUserModal);

// block components
registerComponent(Input);
registerComponent(Button);
registerComponent(Modal);
registerComponent(MenuItem);
registerComponent(Message);
registerComponent(LoginForm);
registerComponent(RegisterForm);
registerComponent(EditProfileForm);
registerComponent(ChangePasswordForm);
registerComponent(MessageForm);
registerComponent(ChangeAvatarForm);
registerComponent(AddUserForm);
registerComponent(RemoveUserForm);

function getRoot(): HTMLElement {
  const root = document.querySelector<HTMLElement>("#app");

  if (!root) {
    throw new Error("Root element #app not found");
  }

  return root;
}

const root = getRoot();

const NAVIGATION_LINKS = [
  { href: ROUTES.LOGIN, text: "Вход" },
  { href: ROUTES.REGISTER, text: "Регистрация" },
  { href: ROUTES.MESSENGER, text: "Чаты" },
  { href: ROUTES.SETTINGS, text: "Профиль" },
  { href: ROUTES.SETTINGS_EDIT, text: "Изменение данных" },
  { href: ROUTES.SETTINGS_PASSWORD, text: "Изменение пароля" },
  { href: ROUTES.NOT_FOUND, text: "404" },
  { href: ROUTES.SERVER_ERROR, text: "500" },
];

const pages: Record<string, () => Block<object>> = {
  "/": () => new NavigationPage({ links: NAVIGATION_LINKS }),
  [ROUTES.LOGIN]: () => new LoginPage(),
  [ROUTES.REGISTER]: () => new RegisterPage(),
  [ROUTES.MESSENGER]: () => new MessengerPage(),
  [ROUTES.SETTINGS]: () => new SettingsPage({ backHref: ROUTES.MESSENGER }),
  [ROUTES.SETTINGS_EDIT]: () => new SettingsPage({ isEdit: true, backHref: ROUTES.SETTINGS }),
  [ROUTES.SETTINGS_PASSWORD]: () => new SettingsPage({ isPassword: true, backHref: ROUTES.SETTINGS }),
  [ROUTES.SERVER_ERROR]: () => new ServerErrorPage(),
};

let currentPage: Block<object> | null = null;

function render(path: string) {
  currentPage?.destroy();

  currentPage = (pages[path] ?? (() => new NotFoundPage()))();
  const element = currentPage.element();
  root.replaceChildren(...(element ? [element] : []));
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest<HTMLAnchorElement>("a[href^='/']");

  if (!link) {
    return;
  }

  event.preventDefault();
  navigate(link.pathname);
});

document.addEventListener("submit", (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement) || form.method === "dialog") {
    return;
  }

  event.preventDefault();
});

window.addEventListener("popstate", () => render(location.pathname));

render(location.pathname);
