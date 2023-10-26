'use client'
import { formatDuration } from '@/lib/hooks/formatDuration';
import { getSong } from '@/utils/db';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment } from 'react';
import LicenseButton from 'ui/Buttons/LicenseButton/LicenseButton';
import AudioVisualizer from 'ui/Components/AudioVisualizer/Visualizer';
import PlayButton from 'ui/Components/Players/PlayButton';
import RelatedMusicList from './RelatedSongs';
function SongPage({ song, image, songs }) {
    const { data } = useQuery({
        queryKey: ["data", song],
        queryFn: () => getSong(song),
        enabled: !!song.music_file_url,
        refetchOnMount: false,
       
    });

    console.log(image)
    return (
        <div className="bg-white dark:bg-black bg-opacity-80 flex justify-center items-center px-4">
            <div className="bg-white dark:bg-black mx-auto p-4 rounded border border-zinc-200 dark:border-zinc-800 relative top-32 max-w-screen-2xl w-full">
                <div className="flex mx-auto items-center p-4">
                    <div className="block min-w-[40px] min-h-[40px] relative rounded-md bg-zinc-500 w-fit mr-2">
                        <Image className="rounded" alt={song?.title} src={image} width={220} height={220} />
                        <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  scale-150">
                            <PlayButton audio={data} song={song} className="scale-150" />
                        </div>
                    </div>  
                    <div className='pl-4 w-full relative max-w-2xl  lg:max-w-4xl  xl:max-w-6xl ml-auto'>
                        <div className='w-full flex items-center justify-between'>

                            <h2 className="text-3xl font-semibold">{song?.title}</h2>
                            <LicenseButton song={song} id={song.song_id} />

                        </div>
                        <p>{song.artist_name}</p>
                        <div className='w-full h-16 overflow-hidden flex justify-between py-4 re items-center'>
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
                <div className='p-4 w-full md:flex space-y-4 md:space-y-0'>
                    <div className='md:w-1/3 md:border-r border-zinc-300 dark:border-zinc-800 pr-8' >

                        {/* DETAILS */}
                        <Fragment>
                            <h2 className='font-semibold text-lg'>
                                Details
                            </h2>
                            <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>
                            Genre: {song.genre}
                            </p>
                            <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>
                            Instrumental: {song.instrumental ? 'Yes' : 'No'}
                            </p>
                            <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>
                            Lyrics: {song.has_lyrics? 'Yes' : 'No'}
                            </p>
                            <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>
                            Stems, wav, mp3, aif formats available with license
                            </p>
                        </Fragment>
                        {/* LYRICS */}
                        {song.lyrics &&
                            <Fragment>
                                <h2 className='font-semibold text-lg'>
                                    Lyrics
                                </h2>
                                <p className='max-w-md text-sm italic text-zinc-700 dark:text-zinc-300'>
                                    {song?.lyrics}
                                </p>
                            </Fragment>}
                    </div>
                    <div className='md:w-2/3  md:pl-8' >
                        <h2 className='font-semibold text-lg'>
                            More Sounds
                        </h2>
                        <RelatedMusicList songs={songs}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SongPage