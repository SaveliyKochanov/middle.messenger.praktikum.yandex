import { CHATS, type Chat } from "../api";

class ChatService {
  private chats: Chat[] = [...CHATS];

  public getChats(): Chat[] {
    return this.chats;
  }

  public getActiveChat(): Chat | undefined {
    return this.chats[0];
  }
}

export const chatService = new ChatService();
