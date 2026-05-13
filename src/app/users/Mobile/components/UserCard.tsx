import { GetUser } from "@/modules/users/models/users";
import {
  MapPin,
  Globe,
  Building2,
  ChevronRight,
  IdCard,
  ActivityIcon,
  PenSquareIcon,
} from "lucide-react";

interface UserCardProps {
  user: GetUser;
  index: number;
  onClick?: (id: number) => void;
}

const UserCard = ({ user, index, onClick }: UserCardProps) => {
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      onClick={() => onClick?.(Number(user?.id))}
      className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-900 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
              {user.name}
            </h3>
            <p className="text-xs text-gray-500">
              @{user.username || "username"}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase tracking-wider">
          #{index + 1}
        </span>
      </div>

      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2 text-gray-600">
          <IdCard size={14} className="text-gray-400" />
          <p className="text-xs truncate font-medium">
            ID Number: {user.id || "No Company"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Building2 size={14} className="text-gray-400" />
          <p className="text-xs truncate font-medium">
            {user.company?.name || "No Company"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={14} className="text-gray-400" />
          <p className="text-xs truncate">
            {user.address?.city}, {user.address?.street}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Globe size={14} className="text-gray-400" />
          <p className="text-xs text-blue-500 hover:underline">
            {user.website}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <ActivityIcon size={14} className="text-gray-400" />
          <div className="flex gap-4">
            <div>
              <p className="text-xs">Completed Todos:</p>
              <p className="text-xs text-green-600 font-bold hover:underline">
                {user.completedTodos}
              </p>
            </div>
            <div>
              <p className="text-xs">Pending Todos:</p>
              <p className="text-xs text-red-500 font-bold hover:underline">
                {user.pendingTodos}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <PenSquareIcon size={14} className="text-gray-400" />
          <div>
            <p className="text-xs text-black">Total Post: {user.totalPosts}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">
            Email
          </span>
          <span className="text-xs text-gray-700 font-medium">
            {user.email}
          </span>
        </div>
        <div className="flex items-center gap-1 text-blue-600 text-xs font-bold bg-blue-50 px-3 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
          Details
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
