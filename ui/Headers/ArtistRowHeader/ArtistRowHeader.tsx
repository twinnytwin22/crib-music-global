'use client'
import Image from "next/image";
import Link from "next/link";
function ArtistRowHeader({artists}) {
    const getUrl = (path) => {
        const url =  "https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/object/public/artist_images/" +
          path;
          return url
        }
  return (
    <div>
         <div className="flex gap-4 max-w-screen-2xl mx-auto w-full">
        {artists.artists.map((artist, i) => (
          
          <div
            key={i}
            className=" aspect-video bg-zinc-500 h-full object-cover w-full overflow-hidden rounded relative  border border-zinc-200 dark:border-zinc-800"
          ><Link href={'/artist/' + artist.artist_id}>
            <Image
              alt={artist.artist_name}
              src={getUrl(artist?.image_url)}
              className=" object-cover hover:scale-110 duration-300 ease-in-out"
              fill
            />
            <h2 className="text-white absolute bottom-4 left-4 font-semibold text-lg0">
              {artist.artist_name}
            </h2>   </Link>
          </div>
       
        ))}
        <div className="aspect-video bg-zinc-500 h-full w-full rounded  border border-zinc-200 dark:border-zinc-800"></div>
      </div>
    </div>
  )
}

export default ArtistRowHeader