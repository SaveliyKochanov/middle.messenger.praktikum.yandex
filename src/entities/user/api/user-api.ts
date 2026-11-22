import { BaseAPI } from "@/shared/api";
import type { PasswordData, ProfileData, UserDTO } from "./types";

class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  public updateProfile(data: ProfileData) {
    return this.http.put<UserDTO>("/profile", { data: { ...data } });
  }

  public updateAvatar(data: FormData) {
    return this.http.put<UserDTO>("/profile/avatar", { data });
  }

  public updatePassword(data: PasswordData) {
    return this.http.put<string>("/password", { data: { ...data } });
  }

  public search(login: string) {
    return this.http.post<UserDTO[]>("/search", { data: { login } });
  }
}

export const userAPI = new UserAPI();
