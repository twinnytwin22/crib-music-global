"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import MusicItem from "ui/Components/Players/MusicItem/MusicItem";

const Pagination = dynamic(() => import("lib/hooks/pagination"), {
  ssr: false,
});

const RelatedMusicList = ({ songs }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexEnd = currentPage * itemsPerPage;
  const indexStart = indexEnd - itemsPerPage;
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  const currentSongs = songs?.slice(indexStart, indexEnd);




  return (
    <div className=" -z-0 relative mx-auto flex justify-center">
  

      <section className="py-4 self-center w-full max-w-screen-2xl mx-auto rounded justify-center relative flex">
        <div className=" z-20 overflow-hidden bg-white shadow dark:bg-zinc-950 sm:rounded w-full border border-zinc-200 dark:border-zinc-800">
      
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
                    <span className="sr-only">License</span>
                  </th>
                  <th scope="col" className="px-4 py-3 ">
                    <span className="sr-only">Menu Dots</span>
                  </th>
                </tr>
              </thead>

              <tbody className=" overflow-y-scroll relative ">
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

export default RelatedMusicList;
