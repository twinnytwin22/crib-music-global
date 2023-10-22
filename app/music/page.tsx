import { getAllSongs } from '@/utils/use-server';
import { Suspense } from 'react';
import MusicList from 'ui/Components/Players/MusicList';

export const dynamic = 'force-dynamic';

async function page() {
  const [songs] = await Promise.all([
    getAllSongs()
  ]);

  console.log(songs.songs);

  return (
<Suspense>
        <MusicList songs={songs?.songs} />
        </Suspense>
 
  );
}

export default page;
