import { Post } from "@/modules/posts/models/post";
import { Todo } from "@/modules/todos/models/todos";
import { CheckCircle2, SquarePen } from "lucide-react";

export type UserPostTodoProps = {
  userTodos: Todo[];
  userPosts: Post[];
};

const UserPostsTodo = ({ userTodos, userPosts }: UserPostTodoProps) => {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-6 items-start">
      <section className="flex-1 w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <SquarePen size={20} className="text-blue-600" />
          <h3 className="font-bold text-gray-800">
            Recent Posts ({userPosts.length || 0})
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {userPosts?.map((post) => (
            <div
              key={post.id}
              className="p-3 bg-gray-50 rounded-xl border border-transparent hover:border-blue-200 transition-colors"
            >
              <p className="text-sm font-semibold text-gray-700 capitalize">
                {post.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={20} className="text-green-600" />
          <h3 className="font-bold text-gray-800">
            Tasks ({userTodos.length || 0})
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {userTodos?.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 p-2">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-default"
              />
              <span
                className={`text-sm ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserPostsTodo;
