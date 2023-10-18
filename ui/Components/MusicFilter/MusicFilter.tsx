'use client'
import React, { useEffect } from "react";
import useSongStore from "../Players/MusicList/store"; // Adjust the import path

function MusicFilter({ songs }) {
  const {
    setSongs,
    filterByArtist,
    filterByGenre,
    filterByKeywords,
    filteredGenres,
    filteredArtists,
    filteredKeywords,
    songs: allSongs, // Store the original songs for getting filter options
  } = useSongStore();

  useEffect(() => {
    setSongs(songs);

    // Initialize the filters with all available options
    filterByGenre(allSongs.map((song) => song.genre));
    filterByArtist(allSongs.map((song) => song.artist_name!).filter((name) => name)); // Remove empty names
    filterByKeywords(
      Array.from(
        new Set(allSongs.flatMap((song) => song.keywords || []))
      )
    );
  }, [allSongs]);

  // Extract unique genres, artists, and keywords from all songs
  const allGenres: any = Array.from(new Set(songs.map((song: any) => song.genre)));
  const allArtists: any = Array.from(new Set(songs.map((song: any) => song.artist_name)));
  const allKeywords = Array.from(
    new Set(allSongs.flatMap((song) => song.keywords || []))
  );

  const handleFilterByGenre = (genre) => {
    if (filteredGenres.includes(genre)) {
      // Deselect genre
      filterByGenre(filteredGenres.filter((g) => g !== genre));
    } else {
      // Select genre
      filterByGenre([...filteredGenres, genre]);
    }
  };

  const handleFilterByArtist = (artistName) => {
    if (filteredArtists.includes(artistName)) {
      // Deselect artist
      filterByArtist(filteredArtists.filter((a) => a !== artistName));
    } else {
      // Select artist
      filterByArtist([...filteredArtists, artistName]);
    }
  };

  const handleFilterByKeywords = (keyword) => {
    if (filteredKeywords.includes(keyword)) {
      // Deselect keyword
      filterByKeywords(filteredKeywords.filter((k) => k !== keyword));
    } else {
      // Select keyword
      filterByKeywords([...filteredKeywords, keyword]);
    }
  };

  return (
    <section className="py-4 pt-8 w-full max-w-screen-2xl mx-auto rounded-md justify-center">
      <div className="z-20 p-4 overflow-hidden bg-white shadow dark:bg-zinc-950 sm:rounded-md w-full border border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex justify-between">
            <div>
              <p>Filter Genres:</p>
              {allGenres.map((genre) => (
                <label className={`${genre ? 'block' : 'hidden'}`} key={genre}>
                  <input
                    type="checkbox"
                    checked={filteredGenres.includes(genre)}
                    onChange={() => handleFilterByGenre(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
            <div>
              <p>Filter Artists:</p>
              {allArtists.map((artistName, i) => (
                <label className={`${artistName ? 'block' : 'hidden'}`} key={i}>
                  <input
                    type="checkbox"
                    checked={filteredArtists.includes(artistName!)}
                    onChange={() => handleFilterByArtist(artistName)}
                  />
                  {artistName}
                </label>
              ))}
            </div>
            <div>
              <p>Filter Keywords:</p>
              {allKeywords.map((keyword) => (
                <label className={`${keyword ? 'block' : 'hidden'}`} key={keyword}>
                  <input
                    type="checkbox"
                    checked={filteredKeywords.includes(keyword)}
                    onChange={() => handleFilterByKeywords(keyword)}
                  />
                  {keyword}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MusicFilter;
