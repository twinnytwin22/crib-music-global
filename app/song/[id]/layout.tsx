"use client";
import { Suspense } from "react";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 600

function layout({ children }) {
  return (
    <div className="relative h-full overflow-y-visible overflow-x-hidden">
      <LicenseModal/>
        <Suspense fallback={<LoadingContainer/>}>
        {children}
        </Suspense>
      </div>
  );
}

export default layout;
