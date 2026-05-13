import { CheckCircle2, SquarePen } from "lucide-react";
import { useState } from "react";
import { UserPostTodoProps } from "../../Desktop/components/UserPostsTodo";

const UserPostsTodoMobile = ({ userTodos, userPosts }: UserPostTodoProps) => {
  const [activeTab, setActiveTab] = useState<"posts" | "todos">("posts");

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex p-1 bg-gray-100 rounded-xl">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "posts"
              ? "bg-white shadow-sm text-blue-600"
              : "text-gray-500"
          }`}
        >
          <SquarePen size={16} /> Posts ({userPosts.length})
        </button>
        <button
          onClick={() => setActiveTab("todos")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "todos"
              ? "bg-white shadow-sm text-green-600"
              : "text-gray-500"
          }`}
        >
          <CheckCircle2 size={16} /> Todos ({userTodos.length})
        </button>
      </div>

      <div className="min-h-">
        {activeTab === "posts" ? (
          <div className="space-y-3">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
              >
                <p className="text-sm font-bold text-gray-800 capitalize leading-snug">
                  {post.title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {userTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-4 border-b border-gray-50 last:border-0"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span
                  className={`text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                >
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostsTodoMobile;
