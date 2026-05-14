import { Suspense } from "react";
import UserList from "./components/userList";

const getData = async () => {
  try {
    const [resUsers, resPosts, resTodos] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users", {
        next: { revalidate: 60 },
      }),
      fetch("https://jsonplaceholder.typicode.com/posts", {
        next: { revalidate: 60 },
      }),
      fetch("https://jsonplaceholder.typicode.com/todos", {
        next: { revalidate: 60 },
      }),
    ]);

    if (!resUsers.ok || !resPosts.ok || !resTodos.ok) {
      throw new Error("Gagal mengambil salah satu data");
    }

    return {
      users: await resUsers.json(),
      posts: await resPosts.json(),
      todos: await resTodos.json(),
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { users: [], posts: [], todos: [] };
  }
};

export default async function UsersPage() {
  const initialData = await getData();

  return (
    <Suspense>
      <UserList
        initialUsers={initialData.users}
        initialPosts={initialData.posts}
        initialTodos={initialData.todos}
      />
    </Suspense>
  );
}
