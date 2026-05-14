"use client";

import MainLayout from "@/components/MainLayout";
import Table, { Column } from "@/components/Table";
import { GetUser } from "@/modules/users/models/users";
import { Post } from "@/modules/posts/models/post";
import { Todo } from "@/modules/todos/models/todos";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SORT_GROUPS } from "@/constants/sort";

interface Props {
  initialUsers: GetUser[];
  initialPosts: Post[];
  initialTodos: Todo[];
}

const UserList = ({
  initialUsers: users,
  initialPosts: posts,
  initialTodos: todos,
}: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState({
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "name-asc",
  });

  const updateQueryParams = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    push(`${pathname}?${params.toString()}`);
  };

  const mappedUsersData = useMemo(() => {
    return users?.map((item) => {
      const userTodos = todos?.filter((todo) => todo.userId == item.id);
      return {
        ...item,
        totalPosts: posts?.filter((post) => post.userId == item.id).length || 0,
        completedTodos:
          userTodos?.filter((todo) => todo.completed === true).length || 0,
        pendingTodos:
          userTodos?.filter((todo) => todo.completed === false).length || 0,
      };
    });
  }, [users, todos, posts]);

  const userList = useMemo(() => {
    if (!mappedUsersData) return [];

    let result = [...mappedUsersData].filter((user) =>
      user?.name?.toLowerCase().includes(filter.search.toLowerCase()),
    );

    result.sort((a, b) => {
      switch (filter.sort) {
        case "name-asc":
          return (a.name || "").localeCompare(b.name || "");
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        case "id-asc":
          return (a.id ?? 0) - (b.id ?? 0);
        case "id-desc":
          return (b.id ?? 0) - (a.id ?? 0);
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
  }, [users, posts, todos, filter]);

  const columns: Column<GetUser>[] = [
    {
      header: "No",
      key: "no",
      render: (_, index) => <p>{Number(index) + 1}</p>,
    },
    { header: "Name", key: "name" },
    { header: "ID", key: "id" },
    { header: "Email", key: "email" },
    {
      header: "Company",
      key: "company",
      render: (item) => {
        const companyName = item?.company?.name;
        return <p>{companyName}</p>;
      },
    },
    {
      header: "Posts",
      key: "post",
      render: (item) => {
        const totalPost = posts?.filter(
          (post) => post.userId == item?.id,
        ).length;

        return <p>{totalPost}</p>;
      },
    },
    {
      header: "Status",
      key: "status",
      render: (item) => (
        <div className="flex gap-2 text-xs">
          <span className="text-green-600">C: {item?.completedTodos}</span>
          <span className="text-red-600">P: {item?.pendingTodos}</span>
        </div>
      ),
    },
    { header: "Website", key: "website" },
  ];

  const handleRemoveFilter = () => {
    setFilter({ search: "", sort: "name-asc" });
    push(pathname);
  };

  const handleRowClick = (user: GetUser) => {
    push(`/users/${user.id}`);
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-20 pb-5 text-gray-700">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold">Search by Name :</p>
            <input
              className="border border-gray-400 px-2 py-1 rounded-lg text-xs outline-none focus:border-blue-500"
              type="text"
              value={filter.search}
              placeholder="Type a name..."
              onChange={(e) => {
                const value = e.target.value;
                setFilter((prev) => ({ ...prev, search: value }));
                updateQueryParams({ search: value });
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold">Sort By:</p>
            <select
              className="border border-gray-400 px-2 py-1 rounded-lg text-xs outline-none bg-white"
              value={filter.sort}
              onChange={(e) => {
                const value = e.target.value;
                setFilter((prev) => ({ ...prev, sort: value }));
                updateQueryParams({ sort: value });
              }}
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

      <Table columns={columns} data={userList} onRowClick={handleRowClick} />
    </MainLayout>
  );
};

export default UserList;
