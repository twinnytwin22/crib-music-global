import { create } from "zustand";

export interface Song {
  id?: number | string;
  title?: string;
  artist_id?: number | string;
  album?: string | null;
  release_year?: number;
  genre?: string;
  lyrics?: string | null;
  duration?: number | null;
  music_file_url?: string;
  cover_art_url?: string | null;
  moods?: string[];
  artist_name?: string | null;
}

export interface SongStore {
  viewName: "genres" | "artists" | "moods" | "";
  filters: {
    genres: string[];
    artists: string[];
    moods: string[];
    hasLyrics?: boolean | null;
    instrumental?: boolean | null;
  };
  setFilters: ({
    genres,
    artists,
    moods,
    hasLyrics,
    instrumental,
  }: {
    genres: string[];
    artists: string[];
    moods: string[];
    hasLyrics?: boolean;
    instrumental?: boolean;
  }) => void;
  activeFilters: string[];
  setActiveFilters: (newFilters: string[]) => void;
  handleClear: () => void;
  handleClearItem: (filter: string) => void;
  handleFilterClick: (filter: string) => void;
  handleSongTypeFilter: (filter: any, e: any) => void;
  fetchInitialData: () => void;
  filterWindowOpen: boolean;
  setFilterWindowOpen: (filterWindowOpen: boolean, viewName: string) => void;
}

export const useMusicFilterStore = create<SongStore>((set) => ({
  viewName: "",
  filters: {
    genres: [],
    artists: [],
    moods: [],
    hasLyrics: true,
    instrumental: true,
  },
  setFilters: ({ genres, artists, moods, hasLyrics, instrumental }) => {
    set((state) => ({
      filters: { genres, artists, moods, hasLyrics, instrumental },
      activeFilters: state.activeFilters,
    }));
  },
  activeFilters: [],
  setActiveFilters: (newFilters) => set(() => ({ activeFilters: newFilters })),
  handleClear: () => set(() => ({ activeFilters: [] })),
  handleClearItem: (filter) =>
    set((state) => ({
      activeFilters: state.activeFilters.filter((f) => f !== filter),
    })),
  handleFilterClick: (filter) =>
    set((state) => {
      if (state.activeFilters.includes(filter)) {
        const newFilters = state.activeFilters.filter((f) => f !== filter);
        return { activeFilters: newFilters };
      } else {
        const newFilters = [...state.activeFilters, filter];
        return { activeFilters: newFilters };
      }
    }),
  handleSongTypeFilter: (filter, e) => {
    set((state) => {
      // Create a copy of the current filters object
      const updatedFilters = { ...state.filters };

      if (filter === "instrumental" || filter === "hasLyrics") {
        // Toggle the boolean value for the selected filter
        updatedFilters[filter] = !updatedFilters[filter];
      }
      // console.log(updatedFilters)
      return { filters: updatedFilters, activeFilters: state.activeFilters };
    });
  },

  filterWindowOpen: false,
  setFilterWindowOpen: (filterWindowOpen: boolean, viewName: any) =>
    set((state) => ({
      viewName,
      filterWindowOpen: state.viewName === viewName ? filterWindowOpen : true,
    })),

  fetchInitialData: () => {
    // Use the filters from the state when cities and states length is greater than 0
    const initialArtists =
      useMusicFilterStore.getState().filters.artists.length > 0 &&
      useMusicFilterStore.getState().filters.artists;

    const initialGenres =
      useMusicFilterStore.getState().filters.genres.length > 0 &&
      useMusicFilterStore.getState().filters.genres;

    const initialKeywords =
      useMusicFilterStore.getState().filters.moods.length > 0 &&
      useMusicFilterStore.getState().filters.moods;
    if (initialKeywords && initialGenres && initialArtists)
      set(() => ({
        filters: {
          genres: initialGenres,
          artists: initialArtists,
          moods: initialKeywords,
          hasLyrics: true,
          instrumental: true,
        },
        activeFilters: [],
      }));
  },
}));

export default useMusicFilterStore;
