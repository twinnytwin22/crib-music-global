import { getSong } from "@/utils/db";
import { getAllSongs } from "@/utils/use-server";
import Image from "next/image";
import SongPage from "ui/Sections/SongPage/SongPage";

export const dynamic = 'force-dynamic' 


async function page({ params, searchParams }: { params: { id: string | number }, searchParams: any }) {
  const { id } = params;
  const { songs } = await getAllSongs();

  // Check if there is a matching song_id for the given id
  const song = songs.find((song: any) => song.song_id.toString() === id);

  if (song) {
    const data = await getSong(song)
    const image = '/song_covers/'+ song.cover_art_url;
    console.log(data)

    return (
      <div className="relative min-h-full bottom-0 overflow-x-hidden z-10">
        <div className="absolute h-screen inset-0 overflow-visible bg-white dark:bg-black opacity-30 ">
          <Image alt={song?.title} src={image} fill className=" object-cover scale-150 blur" />
        </div>

        <SongPage song={song} image={image} songs={songs}/>
      </div>
    );
  } else {
    return null;
  }
}

export default page;
