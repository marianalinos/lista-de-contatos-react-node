import type { AxiosResponse } from "axios";
import { publicApi } from "./axiosInstance";

export type AuthDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    email: string;
    iat: number;
    exp: number;
  };
  token: string;
};

export async function login(authData: AuthDto): Promise<LoginResponse> {
  const response: AxiosResponse<LoginResponse> = await publicApi.post(
    "/user/login",
    authData
  );
  return response.data;
}

export async function register(authData: AuthDto): Promise<void> {
  await publicApi.post("/user/register", authData);
}
