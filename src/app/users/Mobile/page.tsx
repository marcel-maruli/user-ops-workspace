"use client";

import { useQueryGetAllUsers } from "@/modules/users/contexts/users";
import { useMemo, useState } from "react";

const UsersMobile = () => {
  const [filter, setFilter] = useState({ search: "", sort: "name-asc" });
  const { data, isLoading } = useQueryGetAllUsers();

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
    <div className="p-4 bg-gray-50">
      <div className="flex flex-col gap-3 mb-6">
        <input
          className="w-full border border-gray-300 p-3 rounded-xl text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          type="text"
          placeholder="Search name..."
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        <select
          className="w-full border border-gray-300 p-3 rounded-xl text-sm shadow-sm bg-white outline-none text-black"
          value={filter.sort}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="name-asc">Sort: A - Z</option>
          <option value="name-desc">Sort: Z - A</option>
          <option value="id-asc">Sort: ID Smallest</option>
          <option value="id-desc">Sort: ID Largest</option>
        </select>
      </div>

      <div className="space-y-4">
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
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                  No. {index + 1}
                </span>
                <span className="text-[10px] text-gray-400">ID: {user.id}</span>
              </div>
              <h3 className="font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-blue-600 font-medium">
                <span>{user.website}</span>
                <button className="bg-blue-50 px-3 py-1.5 rounded-lg">
                  View Profile
                </button>
              </div>
            </div>
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
