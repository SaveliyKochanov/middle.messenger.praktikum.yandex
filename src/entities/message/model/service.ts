import { MESSAGE_GROUPS, type MessageGroup } from "../api";

const TODAY = "Сегодня";

type Listener = () => void;

class MessageService {
  private groups: MessageGroup[] = MESSAGE_GROUPS.map((group) => ({
    ...group,
    messages: [...group.messages],
  }));

  private listeners: Listener[] = [];

  public getGroups(): MessageGroup[] {
    return this.groups;
  }

  public add(text: string) {
    const lastId = this.groups.flatMap((group) => group.messages).at(-1)?.id ?? 0;
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const message = { id: lastId + 1, text, time, my: true };

    const today = this.groups.at(-1);

    if (today?.date === TODAY) {
      today.messages.push(message);
    } else {
      this.groups.push({ date: TODAY, messages: [message] });
    }

    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export const messageService = new MessageService();
