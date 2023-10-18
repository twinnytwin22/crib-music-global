"use client";
import React, { useEffect, useState } from "react";
import MusicItem from "../MusicItem/MusicItem";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";
import useSongStore from "./store";


const Pagination = dynamic(() => import("lib/hooks/pagination"), {
  ssr: false,
});

const MusicList = ({ songs }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexEnd = currentPage * itemsPerPage;
  const indexStart = indexEnd - itemsPerPage;
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  const router = useRouter();
 const {setSongs, filteredSongs, songs: allSongs} = useSongStore()
 const currentSongs = filteredSongs?.slice(indexStart, indexEnd);

  const handleRefresh = () => router.refresh();
 
  useEffect(() => { setSongs(songs) }, [songs, filteredSongs])
 
  return (
    <div className=" -z-0">
      <section className="py-4  w-full max-w-screen-2xl mx-auto rounded-md justify-center">
        <div className=" z-20 overflow-hidden bg-white shadow-lg dark:bg-zinc-950 sm:rounded-md w-full border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
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
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                onClick={handleRefresh}
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md focus:outline-none hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-black dark:text-zinc-400 dark:border-zinc-800 dark:hover:text-white dark:hover:bg-zinc-700"
              >
                <FiRefreshCcw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
          <div className="overflow-x-clip">
            <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
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
                    <span className="sr-only">Menu Dots</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSongs?.map((song, index: number) => (
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
