import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAllTodos } from "../apis/todos";
import { Todo } from "../models/todos";

export const useQueryGetAllTodos = (options?: Omit<UseQueryOptions<Todo[]>, "queryKey"| "queryFn">) => useQuery<Todo[]>({
    queryKey: ["all-todos"],
    queryFn: () => getAllTodos(),
    ...options
})