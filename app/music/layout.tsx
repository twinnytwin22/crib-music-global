"use client";
import ArtistsPane from "ui/Components/MusicFilter/SideBarAndFilter/ArtistsPane/ArtistsPane";
import GenrePane from "ui/Components/MusicFilter/SideBarAndFilter/GenrePane/GenrePane";
import MoodsPane from "ui/Components/MusicFilter/SideBarAndFilter/MoodsPane/MoodsPane";
import SideBarAndFilter from "ui/Components/MusicFilter/SideBarAndFilter/SideBarAndFilter";
import { useMusicFilterStore } from "ui/Components/Players/MusicList/MusicFormStore";

function layout({ children }) {
  const { filterWindowOpen, viewName, handleFilterClick, activeFilters } =
    useMusicFilterStore();
  const genres = useMusicFilterStore((state) => state.filters.genres);
  const artists = useMusicFilterStore((state) => state.filters.artists);
  const keywords = useMusicFilterStore((state) => state.filters.keywords);

  const paneProps = {
    genres,
    artists,
    keywords,
    handleFilterClick,
    activeFilters,
  };
  return (
    <div className="flex relative">
      <SideBarAndFilter />
      {filterWindowOpen && (
        <div className="mt-32 relative">
          <div className="w-48 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 darK:bg-zinc-800 h-screen fixed left-24 top-0 overflow-y-auto hidden md:block mt-20">
            {viewName === "genres" && <GenrePane {...paneProps} />}
            {viewName === "artists" && <ArtistsPane {...paneProps} />}
            {viewName === "moods" && <MoodsPane {...paneProps} />}
          </div>
        </div>
      )}
      <div
        className={`w-full right-0 mx-auto p-4 md:p-8 ${
          filterWindowOpen ? "md:ml-72" : "md:ml-24"
        } relative`}
      >
        {children}
      </div>
    </div>
  );
}

export default layout;
