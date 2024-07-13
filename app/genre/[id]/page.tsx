import { getAllSongs } from "@/utils/use-server";
import MusicList from "ui/Components/Players/MusicList/MusicList";
import Footer from "ui/Navigation/Footer";

export const dynamic = "force-dynamic";

async function page({
  params,
  searchParams,
}: {
  params: { id: string | number };
  searchParams: any;
}) {
  const { id: pageGenre }:any= params;
  const genreLowerCase = pageGenre.toLowerCase();

  const { songs: fetchedSongs } = await getAllSongs();
  const currentSongs = fetchedSongs.filter((song: any) =>
    song.genres.map((genre: string) => genre.toLowerCase()).includes(genreLowerCase)
  );

  const songPageProps = {
    songs: currentSongs,
  };
  return (
    <div className="relative h-screen ">
      <div className="absolute -z-0 inset-0 overflow-visible bg-white dark:bg-black opacity-30">
      </div>
      <div className="p-20" />
        <MusicList songs={currentSongs}/>
      <div className="p-8" />
      <Footer />
      <div className="p-8" />
    </div>
  );
}

export default page;
