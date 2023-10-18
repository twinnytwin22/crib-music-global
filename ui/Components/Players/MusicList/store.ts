import { create } from 'zustand';

export interface Song {
  song_id: number;
  title: string;
  artist_id: number;
  album: string | null;
  release_year: number;
  genre: string;
  lyrics: string | null;
  duration: number | null;
  music_file_url: string;
  cover_art_url: string | null;
  keywords: string[];
  artist_name: string | null;
}

export interface SongStore {
  songs: Song[];
  filteredSongs: Song[];
  filteredGenres: string[];
  filteredArtists: string[];
  filteredKeywords: string[];
  filterSongs: () => void;

  setSongs: (songs: Song[]) => void;
  filterByGenre: (genre: string[]) => void;
  filterByArtist: (artistName: string[]) => void;
  filterByKeywords: (keywords: string[]) => void;
}

const useSongStore = create<SongStore>((set) => ({
  songs: [],
  filteredSongs: [],
  filteredGenres: [],
  filteredArtists: [],
  filteredKeywords: [],

  setSongs: (filteredSongs) =>
    set(() => ({
      filteredSongs
    })),

  filterSongs: () => {
    set((state) => ({
      filteredSongs: state.songs.filter((song) => {
        const isGenreMatch =
          state.filteredGenres.length === 0 ||
          state.filteredGenres.includes(song.genre);
        const isArtistMatch =
          state.filteredArtists.length === 0 ||
          state.filteredArtists.includes(song.artist_name!);
        const areKeywordsMatch =
          state.filteredKeywords.length === 0 ||
          state.filteredKeywords.some((keyword) =>
            song.keywords.includes(keyword)
          );
        return isGenreMatch && isArtistMatch && areKeywordsMatch;
      }),
    }));
  },

  filterByGenre: (genre) => {
    set((state) => ({
      filteredGenres: Array.isArray(genre) ? genre : [genre],
    }));
  },

  filterByArtist: (artistName) => {
    set((state) => ({
      filteredArtists: Array.isArray(artistName) ? artistName : [artistName],
    }));
  },

  filterByKeywords: (keywords) => {
    set((state) => ({
      filteredKeywords: Array.isArray(keywords) ? keywords : [keywords],
    }));
  },
}));

export default useSongStore;
