import { Suspense } from "react";
import MobileUserContent from "./components/MobileUserContent";

const MobileUser = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MobileUserContent />
    </Suspense>
  );
};

export default MobileUser;
