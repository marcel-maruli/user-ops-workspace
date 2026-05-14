import ResponsiveLayout from "@/components/ResponsiveLayout";
import UsersDesktop from "./Desktop/page";
import UsersMobile from "./Mobile/page";
import { Suspense } from "react";

const Users = () => {
  return (
    <ResponsiveLayout
      desktop={
        <Suspense fallback={<div>Loading...</div>}>
          <UsersDesktop />
        </Suspense>
      }
      mobile={<UsersMobile />}
    />
  );
};

export default Users;
