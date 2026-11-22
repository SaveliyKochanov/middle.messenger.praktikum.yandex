import { userAPI } from "@/entities/user/api";
import { handleApiError, redirectOnFatalError } from "@/shared/api";
import { store, ValidationError } from "@/shared/lib";
import { getField, type FormValues } from "@/shared/ui";
import { chatsAPI } from "../api";

class ChatController {
  public async fetchChats() {
    try {
      store.set("chats", await chatsAPI.getChats());
    } catch (error) {
      if (!redirectOnFatalError(error)) {
        throw error;
      }
    }
  }

  public async createChat(data: FormValues) {
    const title = getField(data, "title").trim();

    if (!title) {
      throw new ValidationError("Введите название чата");
    }

    try {
      const { id } = await chatsAPI.create(title);
      store.set("chats", await chatsAPI.getChats());
      this.selectChat(id);
    } catch (error) {
      handleApiError(error);
    }
  }

  public selectChat(id: number) {
    store.set("activeChatId", id);
  }

  public async addUser(data: FormValues) {
    const chatId = this.getActiveChatId();
    const login = getField(data, "login");

    try {
      const users = await userAPI.search(login);
      const user = users.find((item) => item.login === login);

      if (!user) {
        throw new ValidationError("Пользователь не найден");
      }

      await chatsAPI.addUsers({ users: [user.id], chatId });
    } catch (error) {
      handleApiError(error);
    }
  }

  public async removeUser(data: FormValues) {
    const chatId = this.getActiveChatId();
    const login = getField(data, "login");

    try {
      const members = await chatsAPI.getUsers(chatId);
      const user = members.find((item) => item.login === login);

      if (!user) {
        throw new ValidationError("Такого пользователя нет в чате");
      }

      await chatsAPI.removeUsers({ users: [user.id], chatId });
    } catch (error) {
      handleApiError(error);
    }
  }

  private getActiveChatId(): number {
    const { activeChatId } = store.getState();

    if (typeof activeChatId !== "number") {
      throw new ValidationError("Сначала выберите чат");
    }

    return activeChatId;
  }
}

export const chatController = new ChatController();
