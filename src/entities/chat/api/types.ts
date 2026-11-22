import type { UserDTO } from "@/entities/user/api";

export interface ChatLastMessageDTO {
  user: Omit<UserDTO, "id">;
  time: string;
  content: string;
}

export interface ChatDTO {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: ChatLastMessageDTO | null;
}

export interface ChatsQuery {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface CreateChatResponse {
  id: number;
}

export interface ChatUsersData {
  users: number[];
  chatId: number;
}

export interface ChatUserDTO extends UserDTO {
  role: string;
}
