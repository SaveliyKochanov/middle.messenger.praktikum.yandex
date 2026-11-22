import { RESOURCES_URL, type Indexed } from "@/shared";
import type { ChatDTO } from "../api";

export interface Chat {
  id: number;
  title: string;
  avatarUrl: string;
  unreadCount: number;
  active: boolean;
  lastMessage?: {
    author: string;
    text: string;
    time: string;
  };
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();

  return isToday
    ? date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}

export function toChat(chat: ChatDTO, activeChatId?: unknown): Chat {
  return {
    id: chat.id,
    title: chat.title,
    avatarUrl: chat.avatar ? `${RESOURCES_URL}${chat.avatar}` : "",
    unreadCount: chat.unread_count,
    active: chat.id === activeChatId,
    lastMessage: chat.last_message
      ? {
          author: chat.last_message.user.login,
          text: chat.last_message.content,
          time: formatTime(chat.last_message.time),
        }
      : undefined,
  };
}

export function selectChats(state: Indexed): Chat[] {
  const chats = (state.chats ?? []) as ChatDTO[];

  return chats.map((chat) => toChat(chat, state.activeChatId));
}

export function selectActiveChat(state: Indexed): Chat | undefined {
  return selectChats(state).find((chat) => chat.id === state.activeChatId);
}
