import type { FormValues } from "@/shared/ui";
import { messageService } from "./service";

class MessageController {
  public getMessages() {
    return messageService.getGroups();
  }

  public sendMessage(data: FormValues) {
    console.log(data);

    const { message } = data;

    if (typeof message === "string") {
      messageService.add(message.trim());
    }
  }

  public onMessagesChange(listener: () => void) {
    return messageService.subscribe(listener);
  }
}

export const messageController = new MessageController();
