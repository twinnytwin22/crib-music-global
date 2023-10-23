'use client'
import { formatDuration } from '@/lib/hooks/formatDuration';
import { getSong } from '@/utils/db';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment } from 'react';
import LicenseButton from 'ui/Buttons/LicenseButton/LicenseButton';
import AudioVisualizer from 'ui/Components/AudioVisualizer/Visualizer';
import PlayButton from 'ui/Components/Players/PlayButton';
function SongPage({ song, image }) {
    const { data } = useQuery({
        queryKey: ["data", song],
        queryFn: () => getSong(song),
        enabled: !!song.music_file_url,
        refetchOnMount: false,
        onSuccess: (data) => {

        }
    });
    return (
        <div className="bg-white dark:bg-black bg-opacity-80 flex justify-center items-center px-4">
            <div className="bg-white dark:bg-black mx-auto p-4 rounded border border-zinc-200 dark:border-zinc-800 relative top-48 max-w-screen-xl w-full">
                <div className="flex mx-auto items-center p-4">
                    <div className="block min-w-[40px] min-h-[40px] relative rounded-md bg-zinc-500 w-fit mr-2">
                        <Image className="rounded" alt={song?.title} src={image} width={220} height={220} />
                        <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50">
                            <PlayButton audio={data} song={song} className="scale-150" />
                        </div>
                    </div>  <div className='w-full'>
                        <div className='w-full flex items-center justify-between'>

                            <h2 className="text-3xl font-semibold">{song?.title}</h2>
                            <LicenseButton id={song.song_id} />

                        </div>
                        <p>{song.artist_name}</p>
                        <div className='w-full h-16 overflow-hidden flex justify-between py-4  items-center'>
                            <AudioVisualizer audioFile={data} />
                            <div>
                                <p>
                                    {formatDuration(song.duration)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full border-t border-zinc-300 dark:border-zinc-800 my-4' />
                <div className='p-4 w-full flex'>
                    <div className='w-1/3 border-r border-zinc-300 dark:border-zinc-800 pr-8' >

                        {/* DETAILS */}
                        <Fragment>
                            <h2 className='font-semibold text-xl'>
                                Details
                            </h2>
                            <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>

                            </p>
                        </Fragment>
                        {/* LYRICS */}
                        {song.lyrics &&
                            <Fragment>
                                <h2 className='font-semibold text-xl'>
                                    Lyrics
                                </h2>
                                <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>
                                    {song?.lyrics}
                                </p>
                            </Fragment>}
                    </div>
                    <div className='w-2/3 pl-8' >
                        <h2 className='font-semibold text-xl'>
                            More Sounds
                        </h2>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SongPage