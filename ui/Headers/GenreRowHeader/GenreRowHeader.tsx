"use client";
import Link from "next/link";

const genres = [
  {
    title: "Dance",
    color: "bg-blue-600",
    id: 1,
  },
  {
    title: "Hip-Hop",
    color: "bg-red-600",
    id: 2,
  },
  {
    title: "R&B",
    color: "bg-purple-500",
    id: 3,
  },
];
function GenreRowHeader() {
  return (
    <div className=" select-none">
      <div className="relative flex mt-2 md:mt-0 gap-4 max-w-screen-2xl mx-auto w-full">
        {genres.map((genre, i) => {
          //   const url = `/artist_images/${artist.image_url!}`.trim();
          const href = `/artist/${genre.id!}`;
          return (
            <div
              key={i}
              className={`aspect-video ${genre.color} h-full object-cover w-full overflow-hidden rounded relative  border border-zinc-200 dark:border-zinc-800`}
            >
              <Link href={href} prefetch={false}>
                {/* <Image
                  alt={artist.artist_name}
                  src={url}
                  className="object-cover hover:scale-110 duration-300 ease-in-out relative"
                  width={800}
                  height={450}
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                /> */}
                <h2 className="text-white absolute bottom-4 left-4 font-bold text-xs md:text-sm lg:text-lg font-owners">
                  {genre.title}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GenreRowHeader;
