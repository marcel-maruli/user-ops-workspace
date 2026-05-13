import https from "@/libs/https";
import {  Post} from "../models/post";

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await https.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
