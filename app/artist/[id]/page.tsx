import { getAllArtists, getAllSongs } from "@/utils/use-server";
import Image from "next/image";
import Footer from "ui/Navigation/Footer";
import ArtistPage from "ui/Sections/ArtistPage";

export const fetchCache = "force-cache";
export const dynamic = "auto";

export async function generateStaticParams() {
  const { artists } = await getAllArtists();
  return artists.map((artist: any) => ({
    id: artist.id,
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

  // Check if there is a matching id for the given id
  const artist = artists.find((artist: any) => artist?.id === id);

  if (artist) {
    // const data = await getSong(artist)≈≈
    // console.log(data)
    const { songs } = await getAllSongs();
    const currentSongs = songs.filter(
      (song) => song.artist_name === artist.artist_name,
    );
    const imageUrl = `/artist_images/${artist.image_url!}`.trim();

    const artistPageProps = {
      songs: currentSongs,
      image: imageUrl,
      artist,
    };
    //const href = `/artist/${artist.id!}`;
    return (
      <div className="relative h-screen ">
        <div className="absolute inset-0 overflow-visible bg-white dark:bg-black opacity-30">
          <Image
            alt={artist?.artist_name}
            src={imageUrl}
            fill
            className="object-cover scale-150 blur"
          />
        </div>
        <div className="p-20" />

        <ArtistPage {...artistPageProps} />
        <div className="p-8" />

        <Footer />
        <div className="p-8" />
      </div>
    );
  } else {
    return null;
  }
}

export default page;
