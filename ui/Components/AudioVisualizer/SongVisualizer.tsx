import { useSubportPlayer } from "app/context/subport-player";
import { useEffect } from "react";
import { extractSongURL } from "../Players/PlayButton/PlayButton";

function AudioVisualizer({ audioFile }) {
  const {
    audioUrl: currentAudioUrl,
    audioRef,
    isPlaying,
    timeUpdate,
    dataLoad,
    seekChange,
    currentTime,
  } = useSubportPlayer();
  const { audioUrl, wavesurfer, createWaveSurfer, playPause } =
    useSubportPlayer();

  useEffect(() => {
    // Create a WaveSurfer instance if it doesn't exist or if the audio file has changed
    if (
      !wavesurfer.current ||
      (currentAudioUrl &&
        extractSongURL(audioFile) !==
          (extractSongURL(currentAudioUrl) || extractSongURL(audioUrl)))
    ) {
      // Clean up the previous instance
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }

      createWaveSurfer().then((instance) => {
        wavesurfer.current = instance;
        if (wavesurfer.current) {
          wavesurfer.current.load(audioFile); // Load the audio for this track
          // You can customize other properties for this instance here.
        }
        // Cleanup the instance when the component unmounts or if the audio file changes
        return () => {
          if (
            wavesurfer.current &&
            currentAudioUrl &&
            extractSongURL(audioFile) !== extractSongURL(currentAudioUrl)
          ) {
            playPause();
            wavesurfer.current.destroy();
            wavesurfer.current = null; // Clear the instance to allow recreation
          }
        };
      });
    }
  }, [audioFile, currentAudioUrl, audioUrl]);

  useEffect(() => {
    // If the audio is playing and corresponds to this visualizer instance, update the time
    if (
      wavesurfer.current &&
      currentAudioUrl &&
      isPlaying &&
      extractSongURL(audioFile) === extractSongURL(currentAudioUrl)
    ) {
      wavesurfer.current.setTime(currentTime);
    }
  }, [isPlaying, currentTime, audioFile, currentAudioUrl]);
  console.log(audioRef);
  return (
    currentAudioUrl &&
    audioRef.current &&
    extractSongURL(audioRef.current.currentSrc) ===
      extractSongURL(currentAudioUrl) && (
      <input
        readOnly
        type="range"
        className=" accent-red-300 h-2.5 rounded-full w-full bg-zinc-300 dark:bg-zinc-500 appearance-none cursor-pointer "
        min="0"
        max={
          !audioRef?.current?.duration ? "0:00" : audioRef?.current?.duration
        }
        value={audioRef?.current?.currentTime ?? ""}
        onTimeUpdate={timeUpdate}
        onLoadedData={dataLoad}
        onChange={seekChange}
      />
    )
  );
}

export default AudioVisualizer;
