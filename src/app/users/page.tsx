import ResponsiveLayout from "@/components/ResponsiveLayout";
import UsersDesktop from "./Desktop/page";
import UsersMobile from "./Mobile/page";

const Users = () => {
  return (
    <ResponsiveLayout desktop={<UsersDesktop />} mobile={<UsersMobile />} />
  );
};

export default Users;
