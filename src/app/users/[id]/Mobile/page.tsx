"use client";
import {
  Building2,
  Globe,
  Hash,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { GetUser } from "@/modules/users/models/users";
import UserPostsTodoMobile from "./components/UserPostsTodoMobile";
import { useContext, useEffect, useMemo, useState } from "react";
import { useQueryGetUserDetail } from "@/modules/users/contexts/users";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";
import { useParams, useRouter } from "next/navigation";
import { DetailUserContext } from "../page";
import MainLayout from "@/components/MainLayout";
import { useToast } from "@/utils/useToasts";

const UserDetailMobile = () => {
  const { showToast } = useToast();
  const { push } = useRouter();
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
    [todos, isLoadingTodos, id],
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

  if (isLoading) return <UserDetailMobileSkeleton />;

  return (
    <MainLayout>
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 p-6 flex flex-col items-center border-b border-gray-200">
          <div className="h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md mb-3">
            <User size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
          <p className="text-blue-600 text-sm font-medium mb-3">
            @{data.username}
          </p>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-mono text-gray-400">
            <Hash size={10} />
            <span>ID: {data.id}</span>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <section>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <span className="text-xs text-gray-600 truncate">
                  {data.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <span className="text-xs text-gray-600">{data.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-blue-500" />
                <a
                  href={`https://${data.website}`}
                  target="_blank"
                  className="text-xs text-blue-600 font-medium"
                >
                  {data.website}
                </a>
              </div>
            </div>
          </section>

          <section className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div className="flex gap-3">
              <Building2 size={16} className="text-indigo-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {data?.company?.name}
                </p>
                <p className="text-xs text-gray-500 italic mt-0.5">
                  "{data?.company?.catchPhrase}"
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3">
              Location
            </h3>
            <div className="flex gap-3">
              <MapPin size={16} className="text-emerald-500 shrink-0" />
              <div className="text-xs text-gray-600 space-y-1">
                <p className="font-semibold text-gray-800">
                  {data?.address?.city}
                </p>
                <p>
                  {data?.address?.street}, {data?.address?.suite}
                </p>
                <p className="text-gray-400">{data?.address?.zipcode}</p>
              </div>
            </div>
          </section>

          <UserPostsTodoMobile
            userPosts={userPosts || []}
            userTodos={userTodos || []}
          />
        </div>
      </div>
    </MainLayout>
  );
};

const UserDetailMobileSkeleton = () => (
  <div
    className="w-full bg-white rounded-2xl border border-gray-200 animate-pulse overflow-hidden"
    data-testid="skeleton"
  >
    <div className="bg-slate-50 p-6 flex flex-col items-center">
      <div className="h-20 w-20 bg-gray-200 rounded-2xl mb-3" />
      <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-20 bg-gray-200 rounded" />
    </div>
    <div className="p-5 space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-4 w-full bg-gray-100 rounded" />
      ))}
    </div>
  </div>
);

export default UserDetailMobile;
