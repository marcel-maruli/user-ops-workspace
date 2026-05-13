"use client";

import Table, { Column } from "@/components/Table";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";
import { useQueryGetAllUsers } from "@/modules/users/contexts/users";
import { GetUser } from "@/modules/users/models/users";
import { useMemo, useState } from "react";

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

const UsersDesktop = () => {
  const [filter, setFilter] = useState({ search: "", sort: "asc" });
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

  const columns: Column<GetUser>[] = [
    { header: "No", key: "no", render: (_, index) => <p>{index + 1}</p> },
    { header: "Name", key: "name" },
    { header: "ID", key: "id" },
    { header: "Email", key: "email" },
    {
      header: "Company",
      key: "company",
      render: (item) => {
        const companyName = item.company.name;
        return <p>{companyName}</p>;
      },
    },
    {
      header: "Posts",
      key: "post",
      render: (item) => {
        const totalPost = posts?.filter(
          (post) => post.userId == item.id,
        ).length;

        return <p>{totalPost}</p>;
      },
    },
    {
      header: "Completed Todos",
      key: "completedTodos",
      render: (item) => {
        return (
          <p className="text-green-600 font-bold">{item.completedTodos}</p>
        );
      },
    },
    {
      header: "Pending Todos",
      key: "pendingTodos",
      render: (item) => {
        return <p className="text-red-600 font-bold">{item.pendingTodos}</p>;
      },
    },
    { header: "Website", key: "website" },
  ];

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
    setFilter({ search: "", sort: "asc" });
  };

  return (
    <div>
      <div className="flex items-center gap-20 pb-5 text-gray-700">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold">Search by Name :</p>
            <input
              className="border border-gray-400 px-2 py-1 rounded-lg text-xs outline-none focus:border-blue-500"
              type="text"
              value={filter.search}
              placeholder="Type a name..."
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold">Sort By:</p>
            <select
              className="border border-gray-400 px-2 py-1 rounded-lg text-xs outline-none bg-white"
              value={filter.sort}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, sort: e.target.value }))
              }
            >
              {SORT_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleRemoveFilter}
          className="text-sm text-blue-600 font-bold hover:text-blue-800"
        >
          Clear Filter
        </button>
      </div>

      <Table
        columns={columns}
        data={userList}
        isLoading={isLoading || isLoadingPosts || isLoadingTodos}
      />
    </div>
  );
};

export default UsersDesktop;
