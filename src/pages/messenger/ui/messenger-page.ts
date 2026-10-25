import { chatController } from "@/entities/chat";
import type { Chat } from "@/entities/chat/api";
import { messageController, type MessageGroup } from "@/entities/message";
import { Block } from "@/shared/lib";
import template from "./messenger-page.hbs?raw";

interface Props {
  chats: Chat[];
  chat?: Chat;
  groups: MessageGroup[];
}

export class MessengerPage extends Block<Props> {
  constructor() {
    super({
      chats: chatController.getChats(),
      chat: chatController.getActiveChat(),
      groups: messageController.getMessages(),
    });
  }

  protected override template = template;

  private unsubscribe: (() => void) | null = null;

  protected override componentDidMount() {
    this.unsubscribe = messageController.onMessagesChange(() => {
      this.setProps({ groups: messageController.getMessages() });
    });
  }

  protected override componentWillUnmount() {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }
}
