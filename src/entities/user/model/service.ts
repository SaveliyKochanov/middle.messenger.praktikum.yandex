import { USER, type User } from "../api";

export type UserFields = Partial<Omit<User, "id" | "avatar">>;

class UserService {
  private user: User = { ...USER };

  public getUser(): User {
    return this.user;
  }

  public update(fields: UserFields) {
    this.user = { ...this.user, ...fields };
  }

  public setAvatar(avatar: string) {
    this.user = { ...this.user, avatar };
  }
}

export const userService = new UserService();
