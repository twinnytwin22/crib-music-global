import { getAllArtists, getAllSongs } from "@/utils/use-server";
import Image from "next/image";
import ArtistPage from "ui/Sections/ArtistPage/ArtistPage";

export const fetchCache = 'force-cache'
export const dynamic = 'force-static'


export async function generateStaticParams() {
  const { artists } = await getAllArtists();
  return artists.map((artist: any) => ({
    id: artist.artist_id.toString(),
  }));
}

async function page({
  params,
  searchParams,
}: {
  params: { id: string | number };
  searchParams: any;
}) {
  const { id } = params;
  const { artists } = await getAllArtists();

  // Check if there is a matching artist_id for the given id
  const artist = artists.find(
    (artist: any) => artist.artist_id.toString() === id
  );

  if (artist) {
    // const data = await getSong(artist)≈≈
    // console.log(data)
    const { songs } = await getAllSongs();
    const currentSongs = songs.filter(
      (song) => song.artist_name === artist.artist_name
    );
    const imageUrl = `/artist_images/${artist.image_url!}`.trim();

    const artistPageProps = {
      songs: currentSongs, 
      image: imageUrl, 
      artist
    }
    //const href = `/artist/${artist.artist_id!}`;
    return (
      <div className="relative h-screen bottom-0  z-10">
        <div className="absolute h-screen inset-0 overflow-visible bg-white dark:bg-black opacity-30 ">
          <Image
            alt={artist?.artist_name}
            src={imageUrl}
            style={{
              objectFit: "cover",
            }}
            fill
            sizes="100vh, 100vw"
            className=" object-cover scale-150 blur -z-0 relative w-auto h-auto"
          />
        </div>

        <ArtistPage {...artistPageProps} />
      </div>
    );
  } else {
    return null;
  }
}

export default page;
