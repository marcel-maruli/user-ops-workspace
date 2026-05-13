import https from "@/libs/https";
import { Todo } from "../models/todos";

export const getAllTodos = async():Promise<Todo[]> => {
    try {
        const response = await https.get("/todos")
        return response.data
    } catch (error) {
        throw error
    }
}