"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import UsersDetailDesktop from "./Desktop/page";
import UsersDetailMobile from "./Mobile/page";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { GetUser } from "@/modules/users/models/users";

type DetailUserContextProps = {
  userDetail?: GetUser;
  setUserDetail?: Dispatch<SetStateAction<GetUser>>;
};

export const DetailUserContext = createContext<DetailUserContextProps>({});

const Users = () => {
  const [userDetail, setUserDetail] = useState<GetUser>({});

  return (
    <DetailUserContext.Provider value={{ userDetail, setUserDetail }}>
      <ResponsiveLayout
        desktop={<UsersDetailDesktop />}
        mobile={<UsersDetailMobile />}
      />
    </DetailUserContext.Provider>
  );
};

export default Users;
