import { getAllArtists, getAllSongs } from "@/utils/use-server";
import { Suspense } from "react";
import MusicList from "ui/Components/Players/MusicList";
import GenreRowHeader from "ui/Headers/GenreRowHeader/GenreRowHeader";

export const dynamic = "auto";
export const revalidate = 600;

async function page() {
  const [songs, artists] = await Promise.all([getAllSongs(), getAllArtists()]);

  return (
    <div className="w-full relative py-28 mt-4 md:mt-0 min-h-full">
      <Suspense>
        {/* <ArtistRowHeader artists={artists} /> */}
        <GenreRowHeader />
        <MusicList songs={songs?.songs || songs} />
      </Suspense>
    </div>
  );
}

export default page;
