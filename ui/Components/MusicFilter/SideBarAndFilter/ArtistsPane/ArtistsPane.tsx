
function ArtistsPane({artists, activeFilters, handleFilterClick}) {
    return (
        <div className="mt-4 pl-4 font-work-sans">
          <select
            multiple
            className="text-black dark:text-white text-sm font-medium w-full dark:bg-zinc-950 ring-0 border-none focus:ring-black  outline-0"
            value={activeFilters}
            onChange={(e) => handleFilterClick(e.target.value)}
          >
            {artists.length > 0 &&
              artists.map((artist, i) => (
                <option key={i} value={artist}>
                  {artist}
                </option>
              ))}
          </select>
        </div>
      );
}

export default ArtistsPane