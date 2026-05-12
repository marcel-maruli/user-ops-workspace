"use client";

import Table, { Column } from "@/components/Table";
import { useQueryGetAllUsers } from "@/modules/users/contexts/users";
import { GetUser } from "@/modules/users/models/users";
import { useMemo, useState } from "react";

const UsersDesktop = () => {
  const [filter, setFilter] = useState({ search: "", sort: "asc" });
  const { data, isLoading } = useQueryGetAllUsers();

  const columns: Column<GetUser>[] = [
    { header: "No", key: "no", render: (_, index) => <p>{index + 1}</p> },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "ID", key: "id" },
    { header: "Website", key: "website" },
  ];

  const userList = useMemo(() => {
    if (!data) return [];

    let result = [...data].filter((user) =>
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
        default:
          return 0;
      }
    });

    return result;
  }, [data, filter]);

  return (
    <div>
      <div className="flex items-center gap-5 pb-5">
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold">Search by Name :</p>
          <input
            className="border border-gray-400 px-2 py-1 rounded-lg text-xs outline-none focus:border-blue-500"
            type="text"
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
            <optgroup label="Name">
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </optgroup>
            <optgroup label="ID">
              <option value="id-asc">ID (Smallest)</option>
              <option value="id-desc">ID (Largest)</option>
            </optgroup>
          </select>
        </div>
      </div>

      <Table columns={columns} data={userList} isLoading={isLoading} />
    </div>
  );
};

export default UsersDesktop;
