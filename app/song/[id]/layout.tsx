"use client";
import { Suspense } from "react";
import { useLicensingStore } from "ui/Buttons/LicenseButton/LicenseButtonStore";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";
function layout({ children }) {
const {licenseWindowOpen, setLicenseWindowOpen, song} = useLicensingStore()
 console.log(song)
  return (
    <div className="relative">
      {licenseWindowOpen && <LicenseModal handleClose={() => setLicenseWindowOpen(false)}/>}
        <Suspense fallback={<LoadingContainer/>}>
        {children}
        </Suspense>
      </div>
  );
}

export default layout;
