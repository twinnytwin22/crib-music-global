"use client";

import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import { getAllArtists, getAllSongs } from "@/utils/use-server";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
function SearchBar() {
    const router = useRouter();

    const { data: artists } = useQuery({ queryKey: ['artists'], queryFn: () => getAllArtists() })
    const { data: songs } = useQuery({ queryKey: ['songs'], queryFn: () => getAllSongs() })

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any>({
        artists: [],
        songs: [],
        //drops: []
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false); // New state variable to track input focus
    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // This function will be called whenever searchTerm or isInputFocused changes
        if (searchTerm?.length >= 2 && searchInputRef?.current) {
            //  console.log('Search Active', searchResults, searchTerm);
            // Call the search function here
            search();
        } else {
            setSearchResults({ artists: [], songs: [] });
            setIsOpen((prevState) => !prevState);
        }
    }, [searchTerm, isInputFocused]);
  //  console.log
    const search = () => {
        // Filter artists based on artist_name and genres
        const artistResults = artists.artists.filter((artist) => {
            const artistName = artist.artist_name.toLowerCase();
            const genres = artist.genres.map((genre) => genre.toLowerCase());
            const searchTermLower = searchTerm.toLowerCase();
            return artistName.includes(searchTermLower) || genres.includes(searchTermLower);
        });

        // Filter songs based on artist_name and genres
        const songResults = songs.songs.filter((song) => {
            const artistName = song.artist_name.toLowerCase();
            const genres = song.genres.map((genre) => genre.toLowerCase());
            const searchTermLower = searchTerm.toLowerCase();
            return artistName.includes(searchTermLower) || genres.includes(searchTermLower);
        });

        setSearchResults({ artists: artistResults, songs: songResults });
        setIsOpen(true); // Open the search results dropdown
    };
    const handleInputFocus = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleInputBlur = () => {
        setIsOpen(false);
    };
    useHandleOutsideClick(isOpen, setIsOpen, "search-results");

    const handleLink = (href: string) => {
        router.push(href);
        setSearchTerm("");
        setIsOpen((prevState) => !prevState);
    };

   // console.log(searchResults)
    return (
        <div>
            <form className="block lg:pl-2 w-72 md:w-96">
                <div className="relative z-0">
                    <input
                        autoComplete="off"
                        type="text"
                        id="default_standard"
                        className="block py-2.5 px-0 w-full text-sm text-zinc-950 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                        placeholder=" "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                        onFocus={handleInputFocus} // Add onFocus and onBlur event handlers
                        //   onBlur={handleInputBlur}
                        ref={searchInputRef}
                    />
                    <label
                        htmlFor="default_standard"
                        className="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Search Sounds
                    </label>
                </div>
            </form>

            {isOpen && (
                <div className="absolute max-w-md w-full top-10 left-0  mt-6  bg-white max-h-[300px] overflow-y-scroll dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-md z-[99990] shadow-zinc-300 dark:shadow-black search-results mx-auto">
                    {searchResults?.artists?.length > 0 && (
                        <div className="relative">
                            <div className="p-1 pl-4 bg-zinc-100 dark:bg-black w-full">
                                <h1 className="text-sm font-bold">Artists</h1>
                            </div>
                            {searchResults.artists.map((artist: any) => {
                                const imageUrl = `/artist_images/${artist.image_url!}`.trim();
                                const href = ''
                                return (
                                    <div
                                        onClick={() => handleLink(`/artist/${artist.artist_id}`)}
                                        key={artist.artist_id}
                                        className="flex items-center p-2.5 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative z-[99999] cursor-pointer"
                                    >
                                        <Image
                                            width={100}
                                            height={100}
                                            src={imageUrl}
                                            alt={artist?.artist_name || ''}
                                            className="w-8 h-8 rounded-full mr-2 aspect-square object-cover"
                                        />
                                        <div>
                                            <p className="text-black dark:text-white font-medium text-sm">
                                                {artist.artist_name}
                                            </p>
                                            <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                                                {artist?.email}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {searchResults?.songs?.length > 0 && (
                        <div className="mt-4">
                            <div className="p-1 pl-4 bg-zinc-100 dark:bg-black">
                                <h1 className="text-sm font-bold">Songs</h1>
                            </div>
                            {searchResults.songs.map((song: any) => {
                                const imageUrl = `/song_covers/${song.cover_art_url!}`.trim();
                                const href = ''
                                return (
                                    <div
                                        onClick={() => handleLink(`/song/${song.song_id}`)}
                                        key={song.song_id}
                                        className="flex items-center p-2 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800  cursor-pointer"
                                    >
                                        <Image
                                            width={100}
                                            height={100}
                                            src={imageUrl}
                                            alt={song.title}
                                            className="w-8 h-8 rounded-full mr-2 aspect-square object-cover"
                                        />
                                        <div>
                                            <p className="text-black dark:text-white font-medium text-sm">
                                                {song.title}
                                            </p>
                                            <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                                                {song?.location}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {/* 
          {searchResults?.drops?.length > 0 && (
            <div className="mt-4">
              <div className="p-1 pl-4 bg-white dark:bg-black">
                <h1 className="text-sm font-bold">Drops</h1>
              </div>
              {searchResults.drops.map((drop: any) => (
                <div
                  key={drop.slug}
                  onClick={() => handleLink(`/drop/${drop.slug}`)}
                  className="flex items-center p-2 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <Image
                    width={100}
                    height={100}
                    src={useIpfsImage(drop?.image)}
                    alt={drop.title}
                    className="w-8 h-8 rounded-full mr-2 aspect-square object-cover"
                  />
                  <div>
                    <div className="text-black dark:text-white font-medium">
                      {drop.title}
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {drop?.genres?.toString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}
                </div>
            )}

        </div>
    );
}

export default SearchBar;
