'use client'
import { useMusicFilterStore } from "ui/Components/Players/MusicList/MusicFormStore";

function SideBarAndFilter() {
    const { filterWindowOpen, setFilterWindowOpen, handleSongTypeFilter, filters } =
    useMusicFilterStore();

  return (
    <div className="w-24 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 darK:bg-zinc-800 h-screen fixed left-0 top-0 overflow-y-auto hidden md:block mt-20">
        <div>
    <div className=' relative z-10  font-work-sans place-items-center text-sm'>
      <ul className='text-black dark:text-white text-center '>
        <li onClick={() => setFilterWindowOpen(!filterWindowOpen,'genres')} className='aspect-video border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-white dark:hover:bg-black duration-200 ease-in-out'>
          Genres
        </li>
        <li onClick={() => setFilterWindowOpen(!filterWindowOpen, 'artists')}className='aspect-video border-b border-zinc-200 dark:border-zinc-800  flex items-center justify-center hover:bg-white dark:hover:bg-black duration-200 ease-in-out'>
          Artists
        </li>
        <li onClick={() => setFilterWindowOpen(!filterWindowOpen , 'moods')}className='aspect-video border-b border-zinc-200 dark:border-zinc-800  flex items-center justify-center hover:bg-white dark:hover:bg-black duration-200 ease-in-out'>
          Moods
        </li>
      </ul>
      </div>
      <div className='text-center text-xs w-full font-work-sans'>
  <div className='flex-col flex items-center justify-around border-b border-zinc-200 dark:border-zinc-800 w-full aspect-video'>
    <input
      onChange={() => handleSongTypeFilter('instrumental')}
      id='instrumental'
      type='checkbox'
      name='song-type'
      checked={filters.instrumental === true}
      className='w-5 h-5 accent-red-300'
    />
    <label htmlFor='instrumental'>Instrumental</label>
  </div>
  <div className='flex-col flex items-center justify-around border-b border-zinc-200 dark:border-zinc-800 aspect-video'>
    <input
      onChange={() => handleSongTypeFilter('hasLyrics')}
      id='has_lyrics'
      type='checkbox'
      name='song-type'
      checked={filters.hasLyrics === true}
      className='w-5 h-5 accent-red-300'
    />
    <label htmlFor='Has_lyrics'>Lyrics</label>
  </div>
</div>

    </div>

  </div>
    )
}

export default SideBarAndFilter