"use client";

import { useQueryGetAllUsers } from "@/modules/users/contexts/users";
import { Fragment, useMemo, useState } from "react";
import UserCard from "./components/UserCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDisclosure } from "@/utils/useDisclosure";
import Select from "@/components/Select";

const SORT_OPTIONS = [
  { label: "Sort: A - Z", value: "name-asc" },
  { label: "Sort: Z - A", value: "name-desc" },
  { label: "Sort: ID Smallest", value: "id-asc" },
  { label: "Sort: ID Largest", value: "id-desc" },
];

const UsersMobile = () => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
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
            options={SORT_OPTIONS}
            value={filter.sort}
            onChange={(val) => setFilter((prev) => ({ ...prev, sort: val }))}
            placeholder="Select sorting..."
          />
        </div>
      </div>

      <div className="space-y-4 pt-30">
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
