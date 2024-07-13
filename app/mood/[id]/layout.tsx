'use client'
import { createQueryString } from "@/lib/hooks/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";
import useMusicFilterStore from "ui/Components/Players/MusicList/MusicFormStore";
import SearchBar from "ui/Components/SearchBar";
function layout({ children }) {
  const { filterWindowOpen, viewName, handleFilterClick, activeFilters } =
  useMusicFilterStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const url = createQueryString(searchParams);
  return (
    <div className="overflow-x-hidden">
      <LicenseModal />
      <div
        className={`bg-zinc-50 fixed dark:bg-zinc-950 w-screen top-20 flex right-0 mx-auto p-4 border-t border-b border-zinc-200 dark:border-zinc-800 z-50  ${
        //  filterWindowOpen ? "md:left-72" : "md:left-24"
        ""}`}
      >
        <div
          className={`flex justify-between w-full relative right-0 left-0 items-center `}
        >
          <SearchBar />

          <div
            className={`absolute border-l border-zinc-300 dark:border-zinc-700 h-full p-0 flex px-8 items-center  right-0 ${
              filterWindowOpen ? "md:right-72" : "md:right-24"
            }`}
          >
            <p
              onClick={() => {
                // <pathname>?sort=asc
                router.push(pathname + "?" + url("license", "custom"), {
                scroll: false,
                });
              }}
              className="font-semibold text-black text-sm dark:text-white hover:text-red-400 hover:dark:text-red-300 ease-in-out duration-300 cursor-pointer"
            >
              Custom Music
            </p>
          </div>
        </div>
      </div>
      <Suspense fallback={<LoadingContainer />}>{children}</Suspense>
    </div>
  );
}

export default layout;
