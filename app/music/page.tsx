import { getAllSongs } from '@/utils/use-server';
import MusicList from 'ui/Components/Players/MusicList';

export const dynamic = 'force-dynamic';

async function page() {
  const [songs] = await Promise.all([
    getAllSongs()
  ]);

  console.log(songs.songs);

  return (

        <MusicList songs={songs?.songs} />
 
  );
}

export default page;
