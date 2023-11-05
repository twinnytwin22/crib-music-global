'use client'
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
    play,
    pause, stop
  } = useSubportPlayer();
  const a = extractSongURL(audioFile);
  const b = extractSongURL(audioUrl);
  useEffect(() => {
    // Clean up the previous instance
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
      wavesurfer.current = null;
    }

    if (wavesurfer.current && a !== b) {
      wavesurfer.current.destroy();
      wavesurfer.current = null;
    }

    createWaveSurfer().then((instance) => {
      wavesurfer.current = instance;
      if (wavesurfer.current) {
        wavesurfer.current.load(audioFile);
      }
      // Cleanup the instance when the component unmounts or if the audio file changes
      return () => {
        if (wavesurfer.current && audioUrl && a !== b) {
          stop();
          wavesurfer.current.destroy();
          wavesurfer.current = null; // Clear the instance to allow recreation
        } else {
          play();
        }
      };
    });
  }, [audioFile, audioUrl]);

  useEffect(() => {
    if (
      wavesurfer.current &&
      (currentAudioUrl || audioUrl) &&
      isPlaying &&
      a === b
    ) {
      wavesurfer.current.setTime(currentTime);
    }
  }, [
    isPlaying,
    currentTime,
    audioFile,
    audioUrl,
    currentAudioUrl,
    wavesurfer,
  ]);
  // console.log(currentTime)

 // console.log(contextWaveFormRef);
  return (
    <div ref={contextWaveFormRef} className="w-full max-w-2xl">
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
