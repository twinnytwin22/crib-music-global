import { getCoverImage } from "@/lib/site/constants";
import { getAllSongs } from "@/utils/use-server";
import Image from "next/image";

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
    const image = getCoverImage(song.cover_art_url);

    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image alt={song?.title} src={image} layout="fill" className=" object-cover scale-150 blur"/>
        </div>
        <div className="bg-white dark:bg-black opacity-80 flex fixed h-screen w-screen justify-center items-center"/>

        <div className="bg-white dark:bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-white dark:bg-black mx-auto p-4 rounded border border-zinc-200 dark:border-zinc-800 relative top-48 max-w-screen-xl w-full">
            <div className="flex mx-auto items-center p-4">
              <div className="p-4">
                <Image className="rounded" alt={song?.title} src={image} width={220} height={220} />
              </div>
              <div>
                <h2 className="text-3xl font-semibold">{song?.title}</h2>
                <p>{song.artist_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default page;
