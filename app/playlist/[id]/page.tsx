import { supabaseAdmin } from "@/lib/site/constants";
import { getAllSongs } from "@/utils/use-server";
import Image from "next/image";
import Footer from "ui/Navigation/Footer";
import PlaylistPage from "ui/Sections/PlaylistPage";

//export const fetchCache = "force-cache";
export const dynamic = "force-dynamic"
const getAllPlaylists = async () => {

const { data:playlists, error } = await supabaseAdmin
.from("playlists")
//.insert(updates)
.select();
if (playlists!){
return playlists
}
}

export async function generateStaticParams() {
  const  playlists  = await getAllPlaylists();
  return playlists!.map((playlist: any) => ({
    id: playlist.id,
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
  const  playlists  = await getAllPlaylists();

  // Check if there is a matching id for the given id
  const playlist = playlists!.find((playlist: {id: string}) => playlist?.id === id);

  if (playlist) {
    // const data = await getSong(playlist)≈≈
    // console.log(data)
    const { songs } = await getAllSongs();
    const currentSongs = songs.filter(
      (song) => playlist.ids.includes(song.id.trim()),
    );
    const imageUrl = `/site_images/${playlist.image_url!}`.trim();

    const playlistPageProps = {
      songs: currentSongs,
      image: imageUrl,
      playlist,
    };
    //const href = `/playlist/${playlist.id!}`;
    return (
      <div className="relative h-screen ">
        <div className="absolute inset-0 overflow-visible bg-white dark:bg-black opacity-30">
          <Image
            alt={playlist?.title}
            src={imageUrl}
            fill
            className="object-cover scale-150 blur"
          />
        </div>
        <div className="p-20" />

        <PlaylistPage {...playlistPageProps} />
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
