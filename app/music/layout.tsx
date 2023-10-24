"use client";
import { createQueryString } from "@/lib/hooks/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLicensingStore } from "ui/Buttons/LicenseButton/LicenseButtonStore";
import LicenseModal from "ui/Components/LicenseModal/LicenseModal";
import LoadingContainer from "ui/Components/Loading/Loading";
import SideBarAndFilter from "ui/Components/MusicFilter/SideBarAndFilter";
import ArtistsPane from "ui/Components/MusicFilter/SideBarAndFilter/ArtistsPane";
import GenrePane from "ui/Components/MusicFilter/SideBarAndFilter/GenrePane";
import MoodsPane from "ui/Components/MusicFilter/SideBarAndFilter/MoodsPane";
import { useMusicFilterStore } from "ui/Components/Players/MusicList/MusicFormStore";
function layout({ children }) {
  const { filterWindowOpen, viewName, handleFilterClick, activeFilters } =
    useMusicFilterStore();
  const genres = useMusicFilterStore((state) => state.filters.genres);
  const artists = useMusicFilterStore((state) => state.filters.artists);
  const keywords = useMusicFilterStore((state) => state.filters.keywords);
  const { licenseWindowOpen, setLicenseWindowOpen, song } = useLicensingStore();
  const paneProps = {
    genres,
    artists,
    keywords,
    handleFilterClick,
    activeFilters,
  };
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const url = createQueryString(searchParams)
 
 
  return (
    <div className="relative overflow-x-hidden  right-0 left-0 mx-auto">
      {/** BEGIN TOP BAR */}
      <div
        className={`bg-zinc-50 dark:bg-zinc-950 w-screen flex right-0 mx-auto p-4  border-b border-zinc-200 dark:border-zinc-800  ${
          filterWindowOpen ? "md:left-72" : "md:left-24"
        } relative `}
      >
        <div className={`flex justify-between w-full relative right-0 left-0 items-center `}>
        <form className="block lg:pl-2 w-72 md:w-96">
        <div className="relative z-0">
        <input type="text" id="default_standard" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " />
        <label htmlFor="default_standard" className="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search Sounds</label>
    </div>
        </form>
       
        <div className={`absolute border-l border-zinc-300 dark:border-zinc-700 h-full p-0 flex px-8 items-center  right-0 ${filterWindowOpen ? "md:right-72" : "md:right-24"}`}>
        <p onClick={() => {
    // <pathname>?sort=asc
    router.push(pathname + '?' + url('license', 'custom'))
  }}className="font-semibold text-black dark:text-white hover:text-red-400 hover:dark:text-red-300 ease-in-out duration-300 cursor-pointer">
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
          className={`w-full left-0 right-0 mx-auto p-4 md:p-8 ${
            filterWindowOpen ? "md:ml-72" : "md:ml-24"
          } relative overflow-hidden`}
        >
          <Suspense fallback={<LoadingContainer />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}

export default layout;
