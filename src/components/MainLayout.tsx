import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen bg-white">
      <Navbar />
      <div className="py-4 px-4 pb-10 max-h-[90vh] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
