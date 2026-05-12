"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import UsersDetailDesktop from "./Desktop/page";
import UsersDetailMobile from "./Mobile/page";

const Users = () => {
  return (
    <ResponsiveLayout
      desktop={<UsersDetailDesktop />}
      mobile={<UsersDetailMobile />}
    />
  );
};

export default Users;
