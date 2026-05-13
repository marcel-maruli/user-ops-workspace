"use client";

import { useQueryGetAllUsers } from "@/modules/users/contexts/users";
import { Fragment, useMemo, useState } from "react";
import UserCard from "./components/UserCard";
import Select from "@/components/Select";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";

export const SORT_GROUPS = [
  {
    label: "Alphabetical",
    options: [
      { value: "name-asc", label: "Name (A-Z)" },
      { value: "name-desc", label: "Name (Z-A)" },
    ],
  },
  {
    label: "Sequence",
    options: [
      { value: "id-asc", label: "ID (Low to High)" },
      { value: "id-desc", label: "ID (High to Low)" },
    ],
  },
  {
    label: "Task Status",
    options: [
      { value: "pendingTodos-asc", label: "Pending (Least First)" },
      { value: "pendingTodos-desc", label: "Pending (Most First)" },
      { value: "completedTodos-asc", label: "Completed (Least First)" },
      { value: "completedTodos-desc", label: "Completed (Most First)" },
    ],
  },
];

const UsersMobile = () => {
  const [filter, setFilter] = useState({ search: "", sort: "name-asc" });
  const { data, isLoading } = useQueryGetAllUsers();
  const { data: posts, isLoading: isLoadingPosts } = useQueryGetAllPosts();
  const { data: todos, isLoading: isLoadingTodos } = useQueryGetAllTodos();

  const mappedUsersData = useMemo(
    () =>
      data?.map((item) => {
        const totalTodos = todos?.filter((todo) => todo.userId == item.id);
        return {
          ...item,
          totalPosts: posts?.filter((post) => post.userId == item.id).length,
          completedTodos: totalTodos?.filter((todo) => todo.completed === true)
            .length,
          pendingTodos: totalTodos?.filter((todo) => todo.completed === false)
            .length,
        };
      }),
    [data, posts, todos],
  );

  const userList = useMemo(() => {
    if (!mappedUsersData) return [];

    let result = [...mappedUsersData].filter((user) =>
      user.name.toLowerCase().includes(filter.search.toLowerCase()),
    );

    result.sort((a, b) => {
      switch (filter.sort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "pendingTodos-asc":
          return (a.pendingTodos ?? 0) - (b.pendingTodos ?? 0);
        case "pendingTodos-desc":
          return (b.pendingTodos ?? 0) - (a.pendingTodos ?? 0);
        case "completedTodos-asc":
          return (a.completedTodos ?? 0) - (b.completedTodos ?? 0);
        case "completedTodos-desc":
          return (b.completedTodos ?? 0) - (a.completedTodos ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [data, filter]);

  const handleRemoveFilter = () => {
    setFilter({ search: "", sort: "name-asc" });
  };

  return (
    <div className="p-4">
      <div className="bg-white z-10 w-full absolute top-15 left-0 p-4 shadow-md">
        <div className="flex flex-col gap-3">
          <input
            className="w-full border border-gray-300 p-3 rounded-xl text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="text"
            placeholder="Search name..."
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
          />

          <Select
            options={SORT_GROUPS}
            value={filter.sort}
            onChange={(val) => setFilter((prev) => ({ ...prev, sort: val }))}
            placeholder="Select sorting..."
          />
        </div>
        <div className="flex pt-4 justify-end">
          <button
            onClick={handleRemoveFilter}
            className="text-sm text-blue-600 font-bold hover:text-blue-800"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-40">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))
        ) : userList.length > 0 ? (
          userList.map((user, index) => (
            <Fragment key={user.id}>
              <UserCard index={index} user={user} />
            </Fragment>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-sm">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersMobile;
