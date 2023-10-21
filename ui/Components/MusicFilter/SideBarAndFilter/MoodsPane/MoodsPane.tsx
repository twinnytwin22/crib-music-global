
function MoodsPane({keywords, activeFilters, handleFilterClick}) {
    return (
        <div className="mt-4 pl-4 font-work-sans">
          <select
            multiple
            className="text-black dark:text-white text-sm font-medium w-full dark:bg-zinc-950 ring-0 border-none focus:ring-black  outline-0"
            value={activeFilters}
            onChange={(e) => handleFilterClick(e.target.value)}
          >
            {keywords.length > 0 &&
              keywords.map((keyword, i) => (
                <option key={i} value={keyword}>
                  {keyword}
                </option>
              ))}
          </select>
        </div>
      );
}

export default MoodsPane