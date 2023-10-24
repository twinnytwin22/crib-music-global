import { create } from 'zustand';

export interface Song {
    song_id?: number;
    title?: string;
    artist_id?: number;
    album?: string | null;
    release_year?: number;
    genre?: string;
    lyrics?: string | null;
    duration?: number | null;
    music_file_url?: string;
    cover_art_url?: string | null;
    keywords?: string[];
    artist_name?: string | null;
  }

  export interface SongStore {
    viewName: 'genres' | 'artists' | 'moods' | ''
    filters: {
        genres: string[];
        artists: string[];
        keywords: string[];
    };
    setFilters: ({ genres, artists, keywords }: {   genres: string[]; artists: string[]; keywords: string[];}) => void;
    activeFilters: string[];
    setActiveFilters: (newFilters: string[]) => void;
    handleClear: () => void;
    handleClearItem: (filter: string) => void;
    handleFilterClick: (filter: string) => void;
    fetchInitialData: () => void;
    filterWindowOpen: boolean,
    setFilterWindowOpen: (filterWindowOpen: boolean, viewName: string) => void
  }

  export const useMusicFilterStore = create<SongStore>((set) => ({
    viewName: '',
    filters: {
        genres: [],
        artists: [],
        keywords: []
    },
    setFilters: ({ genres, artists, keywords }) => {
        set((state) => ({
            filters: { genres, artists, keywords},
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
    filterWindowOpen: false, 
    setFilterWindowOpen: (filterWindowOpen: boolean, viewName: any) =>  set((state) => ({
        viewName,
        filterWindowOpen: state.viewName === viewName ? filterWindowOpen : true,
      })),

    fetchInitialData: () => {
        // Use the filters from the state when cities and states length is greater than 0
        const initialArtists = useMusicFilterStore.getState().filters.artists.length > 0
            && useMusicFilterStore.getState().filters.artists;

        const initialGenres = useMusicFilterStore.getState().filters.genres.length > 0
            && useMusicFilterStore.getState().filters.genres;


        const initialKeywords = useMusicFilterStore.getState().filters.keywords.length > 0
        && useMusicFilterStore.getState().filters.keywords;
        if (initialKeywords && initialGenres && initialArtists)
            set(() => ({
                filters: {
                    genres: initialGenres,
                    artists: initialArtists,
                    keywords: initialKeywords
                },
                activeFilters: [],
            }));
    },
}));

export default useMusicFilterStore