import { useEffect } from "react";
import { create } from "zustand";

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTime: 0,
  position: 0,
  duration: 0,
  isPlaying: false,
  audio: null,
  volume: 65,
  isMuted: false,
  prevVolume: 65,
  audioUrl: null,
  imageUrl: null,
  metaData: null,
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
  setSongImage: (imageUrl) => set(() => ({ imageUrl })),
  setCurrentTime: (currentTime) => set(() => ({ currentTime })),
  setPosition: (position) => set(() => ({ position })),
  setDuration: (duration) => set(() => ({ duration })),
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
  setAudio: (audio) => set(() => ({ audio })),
  setVolume: (volume) => set(() => ({ volume })),
  setIsMuted: (isMuted) => set(() => ({ isMuted })),
  setPrevVolume: (prevVolume) => set(() => ({ prevVolume })),
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  setMetaData: (metaData) => set(() => ({ metaData })),

  // Other state setters...
}));

export const usePlaybackTime = (audioRef: any) => {
  useEffect(() => {
    const musicPlayer = audioRef.current;

    const savePlaybackTime = () => {
      localStorage?.setItem(
        "playbackTime",
        musicPlayer?.currentTime?.toString(),
      );
    };

    const loadPlaybackTime = () => {
      const playbackTime = localStorage?.getItem("playbackTime");
      if (playbackTime && musicPlayer) {
        musicPlayer.currentTime = parseFloat(playbackTime);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", savePlaybackTime);
      window.addEventListener("load", loadPlaybackTime);

      return () => {
        window.removeEventListener("beforeunload", savePlaybackTime);
        window.removeEventListener("load", loadPlaybackTime);
      };
    }
  }, [audioRef]);
};

export const useAudio = (
  audioUrl: string | null | undefined,
  setAudio: (audio: HTMLAudioElement | null) => void,
) => {
  useEffect(() => {
    if (audioUrl) {
      setAudio(new Audio(audioUrl));
    }
  }, [audioUrl, setAudio]);
};

export const useSetupAudio = (
  audioRef: any | null,
  audioUrl: string | null | undefined,
  onLoadedData: () => void,
  prevVolume: number,
  volume: number,
  setPrevVolume: any,
) => {
  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current!.volume = volume / 100;

      audioRef.current.addEventListener("loadeddata", onLoadedData);
    }

    return () => {
      if (audioRef.current) {
        setPrevVolume(audioRef.current!.volume);
        audioRef.current.removeEventListener("loadeddata", onLoadedData);
      }
    };
  }, [audioUrl, audioRef, onLoadedData]);
};

export const handlePlay = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setIsPlaying: (isPlaying: boolean) => void,
) => {
  audioRef.current?.play();
  setIsPlaying(true);
};

export const handlePause = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setIsPlaying: (isPlaying: boolean) => void,
) => {
  audioRef.current?.pause();
  setIsPlaying(false);
};

export const handlePlayPause = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setIsPlaying: (isPlaying: boolean) => void,
) => {
  if (audioRef.current) {
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
};

export const handleStop = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setIsPlaying: (isPlaying: boolean) => void,
) => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }
};

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export const useInterval = (
  audioRef: any,
  setCurrentTime: (currentTime: number) => void,
  isPlaying: boolean,
) => {
  useEffect(() => {
    if (audioRef.current) {
      const intervalId = setInterval(() => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [audioRef, setCurrentTime, isPlaying]);
};

export const handleVolumeChange = (
  event: any,
  audioRef: React.RefObject<HTMLAudioElement>,
  setVolume: (volume: number) => void,
) => {
  setVolume(Number(event.target.value));
  audioRef.current!.volume = Number(event.target.value) / 100;
};

export const handleMute = (
  volume: number,
  audioRef: React.RefObject<HTMLAudioElement>,
  setVolume: (volume: number) => void,
) => {
  setVolume(Number(volume));
  audioRef.current!.volume = Number(0) / 100;
};

export const handleUnMute = (
  prevVolume: number,
  audioRef: React.RefObject<HTMLAudioElement>,
  setVolume: (volume: number) => void,
) => {
  setVolume(Number(prevVolume));
  audioRef.current!.volume = Number(prevVolume) / 100;
};

export const handleTimeUpdate = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setPosition: (position: number) => void,
) => {
  setPosition(audioRef.current?.currentTime || 0);
};

export const handleLoadedData = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setDuration: (duration: number) => void,
) => {
  audioRef.current!.load();
  setDuration(audioRef.current?.duration || 0);
};

export const handleSeekChange = (event: any, audioRef: any) => {
  audioRef.current!.currentTime = Number(event?.target?.value);
};

export const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#FCA5A5",
  cursorColor: "Red",
  barWidth: 3,
  barRadius: 3,
  // responsive: true,
  height: 35,
  interact: false,

  // normalize: true,
  // partialRender: true
});
