import { AxiosResponse } from "axios"

export type HttpResponseTodo = AxiosResponse<Todo[]>

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}
