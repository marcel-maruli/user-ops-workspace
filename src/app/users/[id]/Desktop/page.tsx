"use client";

import MainLayout from "@/components/MainLayout";
import { useParams, useRouter } from "next/navigation";
import { DetailUserContext } from "../page";
import { useContext, useEffect, useMemo, useState } from "react";
import { useQueryGetUserDetail } from "@/modules/users/contexts/users";
import { ArrowLeftIcon } from "lucide-react";
import { GetUser } from "@/modules/users/models/users";
import UserDetailCard from "./components/UserDetailCard";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";
import UserPostsTodo from "./components/UserPostsTodo";
import { useToast } from "@/utils/useToasts";

const UsersDetailDesktop = () => {
  const { showToast } = useToast();
  const { back, push } = useRouter();
  const { id } = useParams();

  const { setUserDetail } = useContext(DetailUserContext);

  const [data, setData] = useState<GetUser>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useQueryGetUserDetail();
  const { data: posts, isLoading: isLoadingPosts } = useQueryGetAllPosts();
  const { data: todos, isLoading: isLoadingTodos } = useQueryGetAllTodos();

  const userPosts = useMemo(
    () => posts?.filter((post) => post.userId == Number(id)),
    [posts, isLoadingPosts, id],
  );

  const userTodos = useMemo(
    () => todos?.filter((todo) => todo.userId == Number(id)),
    [posts, isLoadingPosts, id],
  );

  useEffect(() => {
    setIsLoading(true);
    mutate(
      { id: String(id) },
      {
        onSuccess(data) {
          setIsLoading(false);
          setUserDetail?.(data);
          setData(data);
        },
        onError() {
          showToast("User Not Found!", "error");
          push("/");
        },
      },
    );
  }, [id]);

  return (
    <MainLayout>
      <div className="flex flex-col w-full gap-6">
        <button
          onClick={back}
          className="flex items-center gap-2 text-sm font-bold hover:text-gray-500"
        >
          <ArrowLeftIcon size={16} />
          Back To List
        </button>
        <UserDetailCard data={data} isLoading={isLoading} />

        <UserPostsTodo
          userPosts={userPosts || []}
          userTodos={userTodos || []}
        />
      </div>
    </MainLayout>
  );
};

export default UsersDetailDesktop;
