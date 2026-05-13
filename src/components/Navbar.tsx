"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { back } = useRouter();
  const pathname = usePathname();
  const urlSplitted = pathname.split("/");
  const isUserDetail = urlSplitted.length === 3 && urlSplitted[1] === "users";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    setIsMobile(mediaQuery.matches);
  }, []);

  return (
    <div className="bg-gray-600 w-screen h-15 flex items-center py-4 px-4 sticky top-0 gap-5 z-50">
      {isMobile && isUserDetail && (
        <button className="text-white" onClick={back}>
          <ArrowLeft size={20} />
        </button>
      )}
      <p className="text-white font-medium">
        {isUserDetail ? "User Detail" : "User Ops Workspace"}
      </p>
    </div>
  );
};

export default Navbar;
