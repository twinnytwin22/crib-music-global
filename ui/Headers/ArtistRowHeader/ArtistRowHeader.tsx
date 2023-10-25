'use client'
import Image from "next/image";
import Link from "next/link";
function ArtistRowHeader({artists}) {
 
  return (
    <div>
         <div className="flex gap-4 max-w-screen-2xl mx-auto w-full">
        {artists?.artists.map((artist, i) => { 
          const url = `/artist_images/${artist.image_url!}`.trim()
          const  href= `/artist/${artist.artist_id!}`
          return (
          
          <div
            key={i}
            className=" aspect-video bg-zinc-500 h-full object-cover w-full overflow-hidden rounded relative  border border-zinc-200 dark:border-zinc-800"
          ><Link href={href} prefetch={false} >
            <Image
              alt={artist.artist_name}
              src={url}
              className="object-cover hover:scale-110 duration-300 ease-in-out relative"
             width={800}
             height={450}
             priority
             style={{
              objectFit: 'cover',
            }}
            />
            <h2 className="text-white absolute bottom-4 left-4 font-semibold text-lg0">
              {artist.artist_name}
            </h2>  
             </Link>
          </div>
       
        )})}
        <div className="aspect-video bg-zinc-500 h-full w-full rounded  border border-zinc-200 dark:border-zinc-800"></div>
      </div>
    </div>
  )
}

export default ArtistRowHeader