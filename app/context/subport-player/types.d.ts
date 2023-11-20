interface PlayerStore {
  currentTime: number;
  playTime: number 
  position: number;
  duration: number;
  isPlaying: boolean;
  audio: HTMLAudioElement | null | undefined;
  volume: number;
  isMuted: boolean;
  prevVolume: number;
  audioUrl?: string | null | undefined;
  imageUrl: string | null;
  metaData: any[] | null;
  ids: string[];
  activeId?: string;
   playThreshold: number
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setPlayTime: any
  setSongImage: (imageUrl: string | null) => void;
  setCurrentTime: (currentTime: number) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setAudio: (audio: HTMLAudioElement | null) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
  setPrevVolume: (prevVolume: number) => void;
  setAudioUrl: (audioUrl: string | null | undefined) => void;
  setMetaData: (metaData: any[] | null) => void;
}
