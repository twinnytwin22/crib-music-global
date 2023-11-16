"use client";
import { createQueryString } from "@/lib/hooks/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useLicensingStore } from "./LicenseButtonStore";

function LicenseButton({ id, song }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const url = createQueryString(searchParams);
  const handleSetId = () => {
    useLicensingStore.setState({ licenseWindowOpen: true, id, song });
    useLicensingStore.getState().id;
    router.push(pathname + "?" + url("license", "song") + "&" + url("id", id), {
      scroll: false,
    });
  };

  return (
    <React.Fragment>
      <Suspense>
      {id! && song! &&
    <button
      onClick={handleSetId}
      className="bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded"
    >
      License
    </button>}
    </Suspense>
    </React.Fragment>
  );
}

export default LicenseButton;
