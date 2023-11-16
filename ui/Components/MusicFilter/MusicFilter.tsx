"use client";
import { FaDeleteLeft } from "react-icons/fa6";
import { useMusicFilterStore } from "../Players/MusicList/MusicFormStore";

function MusicFilter() {
  const { activeFilters, handleClear, handleFilterClick, handleClearItem } =
    useMusicFilterStore();
  //console.log(activeFilters)
  const genres = useMusicFilterStore((state) => state.filters.genres);
  const artists = useMusicFilterStore((state) => state.filters.artists);
  const moods = useMusicFilterStore((state) => state.filters.moods);

  return (
    <section className="py-4 pt-8 w-full mx-auto rounded-md justify-center select-none font-work-sans">
      <div className="z-20 p-4 overflow-y-scroll h-[500px] overflow-x-hidden bg-white shadow dark:bg-black sm:rounded-md w-full border border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <button
                className={`bg-red-100 my-3 space-y-2 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-950 dark:text-red-300 border border-red-400 `}
                onClick={handleClear}
              >
                Reset
              </button>
              <div className="py-4">
            <ul className="flex space-x-4 items-center flex-wrap">
              {activeFilters.map((item: any) => (
                <li
                  key={item}
                  className={`bg-green-100 flex text-green-800 mb-1 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-950 dark:text-green-400 border border-green-400 `}
                >
                  {item}
                  <span
                    className="cursor-pointer ml-1 text-red-400 text-lg"
                    onClick={() => handleClearItem(item)}
                  >
                    <FaDeleteLeft/>
                  </span>
                </li>
              ))}
            </ul>
          </div>
              <p className="font-owners tracking-wide ">Genres:</p>
              <ul className="flex flex-wrap gap-2">
                {genres.length > 0 &&
                  genres.map((genre, i) => (
                    <li
                      key={i}
                      className={`bg-zinc-100 space-y-2 text-zinc-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-950 dark:text-zinc-300 border border-zinc-400 ${
                        activeFilters.includes(genre) ? "active " : ""
                      }`}
                      //checked={filteredGenres.includes(genre)}
                      onClick={() => handleFilterClick(genre)}
                    >
                      {genre}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="font-owners tracking-wide ">Artists:</p>
              <ul className="flex flex-wrap gap-2">
                {artists.length > 0 &&
                  artists.map((artistName, i) => (
                    <li
                      key={i}
                      className={`bg-zinc-100 space-y-2 text-zinc-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-950 dark:text-zinc-300 border border-zinc-400 ${
                        activeFilters.includes(artistName) ? "active " : ""
                      }`}
                      // type="checkbox"
                      // checked={filteredArtists.includes(artistName!)}
                      onClick={() => handleFilterClick(artistName)}
                    >
                      {artistName}
                    </li>
                  ))}
              </ul>{" "}
            </div>
            <div>
              <p className="font-owners tracking-wide ">Keywords:</p>
              <ul className="flex flex-wrap gap-2">
                {moods.length > 0 &&
                  moods.map((keyword, i) => (
                    <li
                      key={i}
                      className={`bg-zinc-100 space-y-2 text-zinc-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-950 dark:text-zinc-300 border border-zinc-400 ${
                        activeFilters.includes(keyword) ? "active " : ""
                      }`}
                      // type="checkbox"
                      onClick={() => handleFilterClick(keyword)}
                    >
                      {keyword}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default MusicFilter;
