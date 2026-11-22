import Handlebars from "handlebars";
import "./css/index.scss";

import { ROUTES } from "@/shared/config";
import { registerComponent, router } from "@/shared/lib";

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
import { UserInfo, authController } from "@/entities/user";

import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";
import { SearchChat } from "@/features/chat/search";
import { CreateChatButton, CreateChatModal, CreateChatForm } from "@/features/chat/create";
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
Handlebars.registerPartial("CreateChatButton", CreateChatButton);
Handlebars.registerPartial("CreateChatModal", CreateChatModal);
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
registerComponent(CreateChatForm);

router
  .use(ROUTES.LOGIN, LoginPage, { access: "guest" })
  .use(ROUTES.SIGN_UP, RegisterPage, { access: "guest" })
  .use(ROUTES.MESSENGER, MessengerPage, { access: "private" })
  .use(ROUTES.SETTINGS, SettingsPage, {
    access: "private",
    props: { backHref: ROUTES.MESSENGER },
  })
  .use(ROUTES.SETTINGS_EDIT, SettingsPage, {
    access: "private",
    props: { isEdit: true, backHref: ROUTES.SETTINGS },
  })
  .use(ROUTES.SETTINGS_PASSWORD, SettingsPage, {
    access: "private",
    props: { isPassword: true, backHref: ROUTES.SETTINGS },
  })
  .use(ROUTES.NOT_FOUND, NotFoundPage)
  .use(ROUTES.SERVER_ERROR, ServerErrorPage);

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest<HTMLAnchorElement>("a[href^='/']");

  if (!link) {
    return;
  }

  event.preventDefault();
  router.go(link.pathname);
});

document.addEventListener("submit", (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement) || form.method === "dialog") {
    return;
  }

  event.preventDefault();
});

authController.fetchUser().then(
  () => router.start(),
  () => {
    router.start();
    router.go(ROUTES.SERVER_ERROR);
  },
);
