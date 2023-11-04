// layout.tsx
import React, { Suspense } from "react";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <LicenseModal />
        <Suspense fallback={<LoadingContainer />}>
          {children}
        </Suspense>
    </div>
  );
}

export default Layout;
