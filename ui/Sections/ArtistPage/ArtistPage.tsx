"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  FaGlobe,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTwitter,
} from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import RelatedMusicList from "../SongPage/RelatedSongs";
function ArtistPage({ image, artist, songs }) {
 // console.log(image);
  return (
    <div className="bg-white dark:bg-black bg-opacity-80 flex justify-center items-center px-4 ">
            <div className="bg-white dark:bg-black mx-auto p-4 rounded border border-zinc-200 dark:border-zinc-800 relative  max-w-screen-2xl w-full">
        <div className="flex mx-auto items-center p-4">
          <div className="block min-w-[40px] min-h-[40px] relative rounded-md bg-zinc-500 w-fit mr-2">
            <Image
              className="rounded aspect-square object-cover"
              alt={artist?.artist_name}
              src={image}
              width={200}
              height={200}
            />
          </div>
          <div className="w-fit md:flex justify-start items-center space-x-8  space-y-2 md:space-y-0">
            <div className="pl-4 w-fit relative ml-auto">
              {/* <div className='w-full flex items-center justify-between'>

                    */}{" "}
              <h2 className="text-xl md:text-3xl font-semibold whitespace-nowrap">
                {artist?.artist_name}
              </h2>
              <p className="hidden">{artist?.artist_name}</p>
            </div>
            <div className="flex  items-center space-x-2 md:space-x-4 w-full">
              {artist?.social_media_links?.spotify_url && (
                <Link href={artist.social_media_links.spotify_url}>
                  <FaSpotify />
                </Link>
              )}
              {artist?.social_media_links?.applemusic_url && (
                <Link href={artist.social_media_links.applemusic_url}>
                  <SiApplemusic />
                </Link>
              )}
              {artist?.social_media_links?.soundcloud_url && (
                <Link href={artist.social_media_links.soundcloud_url}>
                  <FaSoundcloud />
                </Link>
              )}
              {artist?.social_media_links?.instagram_url && (
                <Link href={artist.social_media_links.instagram_url}>
                  <FaInstagram />

                </Link>
              )}
              {artist?.social_media_links?.x_url && (
                <Link href={artist.social_media_links.x_url}>
                  <FaTwitter />
                </Link>
              )}
              {artist?.social_media_links?.website_url && (
                <Link href={artist.social_media_links.website_url}>
                  <FaGlobe />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="w-full border-t border-zinc-300 dark:border-zinc-800 my-4" />
        <div className="p-4 w-full md:flex space-y-4 md:space-y-0">
          <div className="md:w-1/3 md:border-r border-zinc-300 dark:border-zinc-800 pr-8">
            {/* DETAILS */}
            <Fragment>
              <h2 className="font-semibold text-lg">Details</h2>
              <p className="max-w-md text-sm italic text-zinc-700 dark:text-zinc-300">
                Genres: {artist?.genres}
              </p>
              <p className="max-w-md text-sm italic font-semibold text-zinc-700 dark:text-zinc-300">
                About {artist.artist_name}:
              </p>
              <p className="max-w-md text-sm italic text-zinc-700 dark:text-zinc-300">
                {artist?.biography}
              </p>
            </Fragment>
          </div>
          <div className="md:w-2/3  md:pl-8">
            <h2 className="font-semibold text-lg">
              More Sounds from {artist.artist_name}
            </h2>
            <RelatedMusicList songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
