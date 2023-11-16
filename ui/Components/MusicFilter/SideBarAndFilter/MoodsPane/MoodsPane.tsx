function MoodsPane({ moods, activeFilters, handleFilterClick }) {
  return (
    <div className="mt-4 pl-4 font-work-sans">
      <select
        multiple
        className="text-black dark:text-white text-sm font-medium w-full dark:bg-zinc-950 ring-0 border-none min-h-[90vh] focus:ring-black  outline-0"
        value={activeFilters}
        onChange={(e) => handleFilterClick(e.target.value)}
      >
        {moods.length > 0 &&
          moods.map((moods, i) => (
            <option key={i} value={moods}>
              {moods}
            </option>
          ))}
      </select>
    </div>
  );
}

export default MoodsPane;
