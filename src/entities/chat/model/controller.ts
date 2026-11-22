import type { FormValues } from "@/shared/ui";
import { chatService } from "./service";

class ChatController {
  public getChats() {
    return chatService.getChats();
  }

  public getActiveChat() {
    return chatService.getActiveChat();
  }

  public addUser(data: FormValues) {
    console.log(data);
  }

  public removeUser(data: FormValues) {
    console.log(data);
  }
}

export const chatController = new ChatController();
