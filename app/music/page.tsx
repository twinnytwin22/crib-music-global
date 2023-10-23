import { getAllArtists, getAllSongs } from "@/utils/use-server";
import { Suspense } from "react";
import MusicList from "ui/Components/Players/MusicList";
import ArtistRowHeader from "ui/Headers/ArtistRowHeader/ArtistRowHeader";

export const dynamic = "force-dynamic";

async function page() {
  const [songs, artists] = await Promise.all([getAllSongs(), getAllArtists()]);


  return (
    <Suspense>
     <ArtistRowHeader artists={artists}/>
      <MusicList songs={songs?.songs} />
    </Suspense>
  );
}

export default page;
