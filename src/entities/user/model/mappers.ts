import { RESOURCES_URL, type Indexed } from "@/shared";
import type { UserDTO } from "../api";

export interface User {
  id: number;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar: string;
}

export function toUser(user: UserDTO): User {
  return {
    ...user,
    display_name: user.display_name ?? "",
    avatar: user.avatar ? `${RESOURCES_URL}${user.avatar}` : "",
  };
}

export function selectUser(state: Indexed): User | null {
  const user = state.user as UserDTO | null | undefined;

  return user ? toUser(user) : null;
}
