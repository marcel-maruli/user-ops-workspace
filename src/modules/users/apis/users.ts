import https from "@/libs/https";
import { HttpResponseUser, HttpResponseUserDetail, UserDetailPayload } from "../models/users";

export const getAllUsers = async (): Promise<HttpResponseUser> => {
  try {
    const response = await https.get<HttpResponseUser>("/users");
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
