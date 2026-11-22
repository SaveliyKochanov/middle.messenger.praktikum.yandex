import { chatController, selectActiveChat, selectChats, type Chat } from "@/entities/chat";
import { Block, connect, openModal } from "@/shared/lib";
import template from "./messenger-page.hbs?raw";

interface Props {
  chats: Chat[];
  chat?: Chat;
}

class MessengerPageBase extends Block<Props> {
  constructor(props: Props) {
    super(props);

    void chatController.fetchChats();
  }

  protected override template = template;

  protected override events = {
    click: (event: Event) => this.handleClick(event),
  };

  private handleClick(event: Event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const modalTrigger = event.target.closest<HTMLElement>("[data-modal]");

    if (modalTrigger?.dataset.modal) {
      openModal(modalTrigger.dataset.modal);
      return;
    }

    const chatItem = event.target.closest<HTMLElement>("[data-chat-id]");

    if (chatItem) {
      chatController.selectChat(Number(chatItem.dataset.chatId));
    }
  }
}

const withChats = connect((state) => ({
  chats: selectChats(state),
  chat: selectActiveChat(state),
}));

export const MessengerPage = withChats(MessengerPageBase);
