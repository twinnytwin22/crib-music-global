"use client";
import { createQueryString } from "@/lib/hooks/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";
import SideBarAndFilter from "ui/Components/MusicFilter/SideBarAndFilter";
import ArtistsPane from "ui/Components/MusicFilter/SideBarAndFilter/ArtistsPane";
import GenrePane from "ui/Components/MusicFilter/SideBarAndFilter/GenrePane";
import MoodsPane from "ui/Components/MusicFilter/SideBarAndFilter/MoodsPane";
import { useMusicFilterStore } from "ui/Components/Players/MusicList/MusicFormStore";
import SearchBar from "ui/Components/SearchBar/SearchBar";
import Footer from "ui/Navigation/Footer/Footer";
function layout({ children }) {
  const { filterWindowOpen, viewName, handleFilterClick, activeFilters } =
    useMusicFilterStore();
  const genres = useMusicFilterStore((state) => state.filters.genres);
  const artists = useMusicFilterStore((state) => state.filters.artists);
  const moods = useMusicFilterStore((state) => state.filters.moods);
  const paneProps = {
    genres,
    artists,
    moods,
    handleFilterClick,
    activeFilters,
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const url = createQueryString(searchParams);

  return (
    <div className="relative overflow-x-hidden right-0 left-0 mx-auto">
      {/** BEGIN TOP BAR */}
      <div
        className={`bg-zinc-50 fixed dark:bg-zinc-950 w-screen top-20 flex right-0 mx-auto p-4 border-t border-b border-zinc-200 dark:border-zinc-800 z-50  ${
          filterWindowOpen ? "md:left-72" : "md:left-24"
        }`}
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
      {/**END TOP BAR */}
      <div className="flex relative left-0 right-0 overflow-hidden">
        <SideBarAndFilter />
        <LicenseModal />

        {filterWindowOpen && (
          <div className="mt-32 relative right-0">
            <div
              className={`w-48 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800  h-screen fixed left-24 top-0 right-0 overflow-y-auto hidden md:block mt-20`}
            >
              {viewName === "genres" && <GenrePane {...paneProps} />}
              {viewName === "artists" && <ArtistsPane {...paneProps} />}
              {viewName === "moods" && <MoodsPane {...paneProps} />}
            </div>
          </div>
        )}

        <div
          className={`relative w-full z-0 mx-auto mt-8 p-4 md:p-8 h-screen overflow-y-scroll overflow-x-hidden ${
            filterWindowOpen ? "md:ml-72" : "md:ml-24"
          }`}
        >
          <Suspense fallback={<LoadingContainer />}>{children}</Suspense>
          <Footer />
          <div className="p-8" />
        </div>
      </div>
    </div>
  );
}

export default layout;
