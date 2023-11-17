
import { create } from 'zustand';


interface GlobalStore {
  song_id: string;
  song: any
  setSong: (song: any) => void
  setShowModal: (showModal: boolean) => void
  showModal: boolean;
}

// Function to fetch comments for a specific drop

const useGlobalStore = create<GlobalStore>((set) => ({
  song_id: '', // Initialize with an empty string
  showModal: false,
  song: {},
  setSong: (song: any) => set({song}),
  setShowModal: (showModal: boolean) => set({showModal})
}));

export default useGlobalStore;
