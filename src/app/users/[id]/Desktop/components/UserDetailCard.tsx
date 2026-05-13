import React from "react";
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

const UserDetailCard = ({
  data,
  isLoading,
}: {
  data: GetUser;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  return (
    <div className="w-full  bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
        <div className="h-24 w-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 rotate-3">
          <User size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {data.name}
        </h2>
        <p className="text-blue-600 font-medium mb-6">@{data.username}</p>

        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-mono text-gray-500">
          <Hash size={12} />
          <span>User ID: {data.id}</span>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Mail size={18} />
                </div>
                <span className="text-sm text-gray-700">{data.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Phone size={18} />
                </div>
                <span className="text-sm text-gray-700">{data.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Globe size={18} />
                </div>
                <a
                  href={`https://${data.website}`}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {data.website}
                </a>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
              Work & Company
            </h3>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mt-1">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {data?.company?.name}
                  </p>
                  <p className="text-sm text-gray-500 italic mt-1 leading-relaxed">
                    "{data?.company?.catchPhrase}"
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
              Location Details
            </h3>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <MapPin size={18} />
              </div>
              <div className="grid grid-cols-2 gap-x-12 text-sm text-gray-700">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">
                    Street / Suite
                  </p>
                  <p>
                    {data?.address?.street}, {data?.address?.suite}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold">
                    City / Zipcode
                  </p>
                  <p>
                    {data?.address?.city}, {data?.address?.zipcode}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const UserDetailSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row animate-pulse">
      <div className="w-full md:w-1/3 bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
        <div className="h-24 w-24 bg-gray-200 rounded-2xl mb-4 rotate-3" />
        <div className="h-7 w-3/4 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-6" />
        <div className="h-6 w-24 bg-white border border-gray-100 rounded-full" />
      </div>

      <div className="w-full md:w-2/3 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <div className="h-3 w-32 bg-gray-100 rounded mb-4" />{" "}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg h-9 w-9" />
                  <div className="h-4 w-40 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="h-3 w-32 bg-gray-100 rounded mb-4" />{" "}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-200 rounded-lg h-9 w-9 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </section>

          <section className="md:col-span-2">
            <div className="h-3 w-32 bg-gray-100 rounded mb-4" />{" "}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg h-9 w-9" />
              <div className="grid grid-cols-2 gap-x-12 flex-1">
                <div className="space-y-2">
                  <div className="h-2 w-16 bg-gray-100 rounded" />
                  <div className="h-4 w-32 bg-gray-100 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-16 bg-gray-100 rounded" />
                  <div className="h-4 w-32 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
