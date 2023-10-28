import { getSong } from "@/utils/db";
import { getAllSongs } from "@/utils/use-server";
import Image from "next/image";
import Footer from 'ui/Navigation/Footer';
import SongPage from "ui/Sections/SongPage";


export const dynamic = 'force-dynamic';

async function page({ params, searchParams }: { params: { id: string | number }, searchParams: any }) {
  const { id } = params;
  const { songs } = await getAllSongs();

  // Check if there is a matching song_id for the given id
  const song = songs.find((song: any) => song.song_id.toString() === id);

  if (song) {
    const data = await getSong(song);
    const image = '/song_covers/' + song.cover_art_url;
    console.log(data);

    return (
      <div className='relative h-screen'>
      <div className="absolute inset-0 overflow-hidden bg-white dark:bg-black opacity-30">
          <Image alt={song?.title} src={image} fill className="object-cover scale-150 blur" />
        </div>
        <div className='p-16'/>

        <SongPage song={song} image={image} songs={songs} />
        <div className='p-8'/>

    <Footer/>
    <div className='p-8'/>
        {/* <div className="">
          <SongPage song={song} image={image} songs={songs} />
        </div> */}
   
      </div>
    );
  } else {
    return null;
  }
}

export default page;
