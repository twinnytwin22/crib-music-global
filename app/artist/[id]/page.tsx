import { getAllArtists } from "@/utils/use-server";
import Image from "next/image";
import ArtistPage from "ui/Sections/ArtistPage/ArtistPage";

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
   // const data = await getSong(artist)≈≈
   // console.log(data)

    return (
      <div className="relative min-h-full bottom-0 overflow-x-hidden z-10">
        <div className="absolute h-screen inset-0 overflow-visible bg-white dark:bg-black opacity-30 ">
          <Image alt={artist?.artist_name} src={'/artist_images/'+artist?.image_url} fill className=" object-cover scale-150 blur -z-0" />

        </div>

      <ArtistPage artist={artist} image={'/artist_images/'+artist?.image_url} />
      </div>
    );
  } else {
    return null;
  }
}

export default page;
