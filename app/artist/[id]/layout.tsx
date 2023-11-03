import { Suspense } from "react";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";
function layout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <LicenseModal/>
        <Suspense fallback={<LoadingContainer/>}>
        {children}
        </Suspense>
      </div>
  );
}

export default layout;
