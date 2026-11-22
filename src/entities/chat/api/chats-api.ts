import { BaseAPI } from "@/shared/api";
import type { ChatDTO, ChatsQuery, ChatUserDTO, ChatUsersData, CreateChatResponse } from "./types";

class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  public getChats(query: ChatsQuery = {}) {
    return this.http.get<ChatDTO[]>("", { data: { ...query } });
  }

  public create(title: string) {
    return this.http.post<CreateChatResponse>("", { data: { title } });
  }

  public remove(chatId: number) {
    return this.http.delete<unknown>("", { data: { chatId } });
  }

  public addUsers(data: ChatUsersData) {
    return this.http.put<string>("/users", { data: { ...data } });
  }

  public removeUsers(data: ChatUsersData) {
    return this.http.delete<string>("/users", { data: { ...data } });
  }

  public getUsers(chatId: number) {
    return this.http.get<ChatUserDTO[]>(`/${chatId}/users`);
  }
}

export const chatsAPI = new ChatsAPI();
