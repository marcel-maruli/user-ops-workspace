import { useMutation,  useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAllUsers, getUserDetail } from "../apis/users";
import { GetUser, HttpResponseUserDetail, UserDetailPayload } from "../models/users";

export const useQueryGetAllUsers = (
  options?: Omit<UseQueryOptions<GetUser[]>, "queryKey" | "queryFn">,
) =>
  useQuery<GetUser[]>({
    queryKey: ["all-users"],
    queryFn: () => getAllUsers(),
    ...options,
  });

export const useQueryGetUserDetail = () => useMutation<GetUser, unknown, UserDetailPayload>({
  mutationKey: ["user-detail"],
  mutationFn: (id: UserDetailPayload) => getUserDetail(id),
});
