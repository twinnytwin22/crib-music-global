import { getAllArtists, getAllSongs } from '@/utils/use-server'
import React from 'react'
import MusicFilter from 'ui/Components/MusicFilter/MusicFilter'
import MusicList from 'ui/Components/Players/MusicList'
export const dynamic = 'force-dynamic'
async function page() {
  const [songs] = await Promise.all([
    //getAllArtists(), 
    getAllSongs()
  ])

  console.log(songs.songs)
  return (
    <div className='px-4'>
      <MusicList songs={songs?.songs}/></div>
  )
}

export default page