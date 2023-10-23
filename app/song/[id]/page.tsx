import { getCoverImage } from "@/lib/site/constants";
import { getSong } from "@/utils/db";
import { getAllSongs } from "@/utils/use-server";
import Image from "next/image";
import SongPage from "ui/Sections/SongPage/SongPage";

export async function generateStaticParams() {
  const { songs } = await getAllSongs();
  return songs.map((song: any) => ({
    id: song.song_id.toString(),
  }));
}

async function page({ params, searchParams }: { params: { id: string | number }, searchParams: any }) {
  const { id } = params;
  const { songs } = await getAllSongs();

  // Check if there is a matching song_id for the given id
  const song = songs.find((song: any) => song.song_id.toString() === id);

  if (song) {
    const data = await getSong(song)
    const image = getCoverImage(song.cover_art_url);
    console.log(data)

    return (
      <div className="relative h-full overflow-x-hidden">
        <div className="absolute inset-0 z-0">
          <Image alt={song?.title} src={image} fill className=" object-cover scale-150 blur" />
        </div>
        <div className="bg-white dark:bg-black opacity-80 flex fixed h-full w-screen justify-center items-center touch-auto" />

        <SongPage song={song} image={image} songs={songs}/>
      </div>
    );
  } else {
    return null;
  }
}

export default page;
