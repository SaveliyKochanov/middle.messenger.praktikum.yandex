import Handlebars from "handlebars";
import "./css/index.scss";

import { ROUTES } from "@/shared/config";
import { initModals } from "@/shared/lib";

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

import { CHATS } from "@/entities/chat/api";

import { ChatItem } from "@/entities/chat";
import { Message, MESSAGE_GROUPS } from "@/entities/message";
import { UserInfo } from "@/entities/user";
import { USER } from "@/entities/user/api";

import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";
import { SearchChat } from "@/features/chat/search";
import { MessageForm } from "@/features/chat/send-message";
import { AttachFileButton } from "@/features/chat/attach-file";
import { AddUserButton, AddUserModal } from "@/features/user/add";
import { RemoveUserButton, RemoveUserModal } from "@/features/user/remove";
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
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
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
Handlebars.registerPartial("Modal", Modal);
Handlebars.registerPartial("MenuItem", MenuItem);
Handlebars.registerPartial("ErrorScreen", ErrorScreen);

// entities
Handlebars.registerPartial("ChatItem", ChatItem);
Handlebars.registerPartial("Message", Message);
Handlebars.registerPartial("UserInfo", UserInfo);

// widgets
Handlebars.registerPartial("ChatSidebar", ChatSidebar);
Handlebars.registerPartial("ChatWindow", ChatWindow);
Handlebars.registerPartial("ChatWindowHeader", ChatWindowHeader);
Handlebars.registerPartial("ChatWindowMessages", ChatWindowMessages);

// features
Handlebars.registerPartial("LoginForm", LoginForm);
Handlebars.registerPartial("RegisterForm", RegisterForm);
Handlebars.registerPartial("SearchChat", SearchChat);
Handlebars.registerPartial("MessageForm", MessageForm);
Handlebars.registerPartial("EditProfileForm", EditProfileForm);
Handlebars.registerPartial("ChangePasswordForm", ChangePasswordForm);
Handlebars.registerPartial("ChangeAvatarForm", ChangeAvatarForm);
Handlebars.registerPartial("AttachFileButton", AttachFileButton);
Handlebars.registerPartial("AddUserButton", AddUserButton);
Handlebars.registerPartial("AddUserModal", AddUserModal);
Handlebars.registerPartial("RemoveUserButton", RemoveUserButton);
Handlebars.registerPartial("RemoveUserModal", RemoveUserModal);

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

const pages: Record<string, () => string> = {
  "/": () => NavigationPage({ links: NAVIGATION_LINKS }),
  [ROUTES.LOGIN]: () => LoginPage({}),
  [ROUTES.REGISTER]: () => RegisterPage({}),
  [ROUTES.MESSENGER]: () => MessengerPage({ chats: CHATS, chat: CHATS[0], groups: MESSAGE_GROUPS }),
  [ROUTES.SETTINGS]: () => SettingsPage({ user: USER, backHref: ROUTES.MESSENGER }),
  [ROUTES.SETTINGS_EDIT]: () => SettingsPage({ user: USER, isEdit: true, backHref: ROUTES.SETTINGS }),
  [ROUTES.SETTINGS_PASSWORD]: () => SettingsPage({ user: USER, isPassword: true, backHref: ROUTES.SETTINGS }),
  [ROUTES.SERVER_ERROR]: () => ServerErrorPage({}),
};

function render(path: string) {
  const page = pages[path] ?? (() => NotFoundPage({}));
  root.innerHTML = page();
}

function navigate(path: string) {
  if (path !== location.pathname) {
    history.pushState({}, "", path);
  }
  render(path);
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

  if (form.dataset.redirect) {
    navigate(form.dataset.redirect);
  }
});

window.addEventListener("popstate", () => render(location.pathname));

initModals();
render(location.pathname);
