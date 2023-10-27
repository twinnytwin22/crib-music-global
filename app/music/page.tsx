import { getAllArtists, getAllSongs } from "@/utils/use-server";
import { Suspense } from "react";
import MusicList from "ui/Components/Players/MusicList";
import ArtistRowHeader from "ui/Headers/ArtistRowHeader/ArtistRowHeader";

export const dynamic = "force-dynamic";

async function page() {
  const [songs, artists] = await Promise.all([getAllSongs(), getAllArtists()]);


  return (
    <div className="w-full relative py-28 min-h-full">
    <Suspense>
     <ArtistRowHeader artists={artists}/>
      <MusicList songs={songs?.songs} />
    </Suspense>
    </div>
  );
}

export default page;
