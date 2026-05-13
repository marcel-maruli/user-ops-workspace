import https from "@/libs/https";
import { GetUser,  HttpResponseUserDetail, UserDetailPayload } from "../models/users";

export const getAllUsers = async (): Promise<GetUser[]> => {
  try {
    const response = await https.get<GetUser[]>("/users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserDetail = async ({ id }: UserDetailPayload) => {
  try {
    const response = await https.get<HttpResponseUserDetail>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
