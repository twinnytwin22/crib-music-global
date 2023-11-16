"use client";
function GenrePane({ genres, activeFilters, handleFilterClick }) {
  return (
    <div className="mt-4 pl-4 font-work-sans ">
      <select
        multiple
        className="text-black dark:text-white text-sm font-medium w-full dark:bg-zinc-950 ring-0 border-none focus:ring-black min-h-[90vh]  outline-0"
        value={activeFilters}
        onChange={(e) => handleFilterClick(e.target.value)}
      >
        {genres.length > 0 &&
          genres.map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
      </select>
    </div>
  );
}

export default GenrePane;
