import { getSong } from "@/utils/db";
import { getAllArtists } from "@/utils/use-server";
import Image from "next/image";

export async function generateStaticParams() {
  const { artists } = await getAllArtists();
  return artists.map((artist: any) => ({
    id: artist.artist_id.toString(),
  }));
}

async function page({ params, searchParams }: { params: { id: string | number }, searchParams: any }) {
  const { id } = params;
  const { artists } = await getAllArtists();

  // Check if there is a matching artist_id for the given id
  const artist = artists.find((artist: any) => artist.artist_id.toString() === id);

  if (artist) {
    const data = await getSong(artist)
    const getUrl = (path) => {
      const url =  "https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/object/public/artist_images/" +
        path;
        return url
      }
  
    console.log(data)

    return (
      <div className="relative min-h-screen overflow-y-visible overflow-x-hidden">
        <div className="absolute inset-0">
          <Image alt={artist?.artist_name} src={'/artist_images/'+artist?.image_url} fill className=" object-cover scale-150 blur" />
        </div>
        <div className="bg-white dark:bg-black opacity-80 flex fixed h-screen w-screen justify-center items-center" />

        {/* <SongPage artist={artist} image={image} artists={artists}/> */}
      </div>
    );
  } else {
    return null;
  }
}

export default page;
