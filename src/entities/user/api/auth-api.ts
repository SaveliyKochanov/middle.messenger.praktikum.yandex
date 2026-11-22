import { BaseAPI } from "@/shared/api";
import type { SignInData, SignUpData, SignUpResponse, UserDTO } from "./types";

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  public signUp(data: SignUpData) {
    return this.http.post<SignUpResponse>("/signup", { data: { ...data } });
  }

  public signIn(data: SignInData) {
    return this.http.post<string>("/signin", { data: { ...data } });
  }

  public getUser() {
    return this.http.get<UserDTO>("/user");
  }

  public logout() {
    return this.http.post<string>("/logout");
  }
}

export const authAPI = new AuthAPI();
