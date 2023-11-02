import { useSubportPlayer } from "app/context/subport-player";
import { usePlayerStore } from "app/context/subport-player/PlayerLogic";
import { useEffect } from "react";
import { extractSongURL } from "../Players/PlayButton/PlayButton";

function AudioVisualizer({ audioFile }) {
  const {
    isPlaying,
    currentTime,
    audioUrl: currentAudioUrl,
  } = usePlayerStore();
  const {
    audioUrl,
    wavesurfer,
    contextWaveFormRef,
    createWaveSurfer,
    playPause,
  } = useSubportPlayer();

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
      extractSongURL(wavesurfer.current.currentSrc) === extractSongURL(currentAudioUrl)
    ) {
      wavesurfer.current.setTime(currentTime);
    }
  }, [isPlaying, currentTime, audioFile, currentAudioUrl]);

  return (
    <div ref={contextWaveFormRef} className="w-full max-w-2xl ">
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
