"use client";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import MusicFilter from "ui/Components/MusicFilter";
import MusicItem from "../MusicItem/MusicItem";
import { useMusicFilterStore } from "./MusicFormStore";

const Pagination = dynamic(() => import("lib/hooks/pagination"), {
  ssr: false,
});

const MusicList = ({ songs }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
//  const pathname = usePathname()
  const [itemsPerPage] = useState(10);
  const indexEnd = currentPage * itemsPerPage;
  const indexStart = indexEnd - itemsPerPage;
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  const currentSongs = songs?.slice(indexStart, indexEnd);
  const [openFilterWindow, setOpenFilterWindow] = useState(false)
  const [filtersSet, setFiltersSet] = useState(false); // Track if filters have been set
  const handleOpenFilterWindow = () => setOpenFilterWindow(true)

  const { setActiveFilters, setFilters, activeFilters, filters, handleClear } =
    useMusicFilterStore();


  useEffect(() => {
    // Call the useLocationExtractor function asynchronously
    async function fetchData() {
      try {
        // const locationDataArray = await useLocationExtractor(events.map((event: any) => event.location));
        const genres: any = Array.from(
          new Set(songs.flatMap((song: any) => song?.genres || [].flat()))
        ).filter(Boolean);
        const artists: any = Array.from(
          new Set(songs.map((song: any) => song?.artist_name))
        ).filter(Boolean);
        const moods: any = Array.from(
          new Set(songs.flatMap((song) => song?.moods || []))
        ).filter(Boolean);

        // const instrumentalOnly: any = new Set(songs.map((song) => song?.instrumental).filter(Boolean)
        // )
        // const hasLyrics: any = new Set(songs.map((song) => song?.has_lyrics).filter(Boolean)
        // )
        // console.log('hasLyrics:',hasLyrics, 'instrumental:', instrumentalOnly)
        if (songs.length > 0) {
          if (!filtersSet) {
            setFilters({ genres, artists, moods, instrumental: true, hasLyrics: true });
            setFiltersSet(true);
            //  console.log(cities, states);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [songs, setFilters, setActiveFilters, filtersSet]);

  function filterByInstrumental(song) {
    const { instrumental: instr } = song;
    return filters.instrumental ? instr : false;
}

// A function to filter songs by has_lyrics
function filterByHasLyrics(song) {
    const { has_lyrics } = song;
    return filters.hasLyrics ? has_lyrics : false;
}
const filteredSongs = songs.filter((song) => {
  const { genres, artist_name, moods, has_lyrics, instrumental } = song;
  const activeFilter = activeFilters.map((a) => a);

  const includesFilters =
      activeFilter.some((filteredGenre) => genres.includes(filteredGenre)) ||
      activeFilter.some((artist) => artist_name.includes(artist)) ||
      activeFilter.some((filteredMood) => moods.includes(filteredMood));

  
      if (activeFilters.length === 0) {
        if (!filters.instrumental && !filters.hasLyrics) {
            // If no active filters and both instrumental and has_lyrics filters are deselected,
            // include all songs
            return false;
        }

        if (filters.instrumental && filters.hasLyrics) {
            // If no active filters and both instrumental and has_lyrics filters are selected,
            // exclude all songs
            return true;
        }

        if (filters.instrumental || filters.hasLyrics) {
          // If no active filters and both instrumental and has_lyrics filters are selected,
          // exclude all songs
          return ((filterByInstrumental(song) || filterByHasLyrics(song)));
        }
    }

  return ((filterByInstrumental(song) || filterByHasLyrics(song)) && includesFilters);
});

  useHandleOutsideClick(openFilterWindow, setOpenFilterWindow, 'filter-window')
 // console.log(filters)
  return (
    <div className=" -z-0 relative mx-auto flex justify-center select-none">
      {openFilterWindow && 
      <div className="fixed z-[9999] flex items-center justify-center mx-8">
        <div className="w-full inset-0 h-screen bg-black fixed z-0 opacity-80"></div>
        <div className="z-[9999] w-full max-w-3xl filter-window relative -top-16 max-h-[200px] self-start">
          <MusicFilter />
        </div>
      </div>}

      <section className="py-4 self-center w-full max-w-screen-2xl mx-auto rounded justify-center  flex">
        <div className=" z-20 overflow-hidden bg-white shadow dark:bg-zinc-950 sm:rounded w-full border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col px-4 py-3 space-y-3 md:flex-row md:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4 text-sm md:text-base">
              <h5>
                <span className="text-zinc-500">All Sounds:</span>
                <span className="dark:text-white">
                  {songs?.length.toString()}
                </span>
              </h5>
              <h5 className="hidden">
                <span className="text-zinc-500">Total Playlists:</span>
                <span className="dark:text-white">1</span>
              </h5>
            </div>
            <div className=" flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center content-center h-fit md:justify-end md:space-y-0 md:space-x-3">
              <button
                onClick={handleOpenFilterWindow}
                type="button"
                className="flex md:hidden items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded focus:outline-none hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-black dark:text-zinc-400 dark:border-zinc-800 dark:hover:text-white dark:hover:bg-zinc-700"
              >
                <FaFilter className="w-4 h-3 mr-2" />
                Filter
              </button>
              <button
                onClick={handleClear}
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded focus:outline-none hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-black dark:text-zinc-400 dark:border-zinc-800 dark:hover:text-white dark:hover:bg-zinc-700"
              >
                <FiRefreshCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
          <div className="overflow-x-scroll">
            <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 overflow-x-scroll ">
              <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-4 py-3 -mr-20">
                    Track Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Artist
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Genre
                  </th>
                  <th scope="col" className="px-4 py-3 ">
                    <span className="sr-only">License</span>
                  </th>
                  <th scope="col" className="px-4 py-3 ">
                    <span className="sr-only">Menu Dots</span>
                  </th>
                </tr>
              </thead>

              <tbody className=" overflow-y-scroll  ">
                {filteredSongs?.map((song, index: number) => (
                  <MusicItem key={index} song={song} />
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={currentSongs?.length}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              currentPage={currentPage}
            />{" "}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default MusicList;
