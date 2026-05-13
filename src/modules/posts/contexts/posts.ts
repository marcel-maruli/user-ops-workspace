import {  useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Post } from "../models/post";
import { getAllPosts } from "../apis/posts";

export const useQueryGetAllPosts = (
  options?: Omit<UseQueryOptions<Post[]>, "queryKey" | "queryFn">,
) =>
  useQuery<Post[]>({
    queryKey: ["all-posts"],
    queryFn: () => getAllPosts(),
    ...options,
  });