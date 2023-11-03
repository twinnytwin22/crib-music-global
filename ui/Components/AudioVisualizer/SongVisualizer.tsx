import { useSubportPlayer } from "app/context/subport-player";
import { usePlayerStore } from "app/context/subport-player/PlayerLogic";
import { useEffect } from "react";

function AudioVisualizer({ audioFile }) {
  const {
    isPlaying,
    currentTime,
   // audioUrl: currentAudioUrl,
  } = usePlayerStore();
  const {
  //  audioUrl,
    wavesurfer,
    contextWaveFormRef,
    createWaveSurfer,
    playPause,
  } = useSubportPlayer();

  useEffect(() => {
    // Create a WaveSurfer instance if it doesn't exist or if the audio file has changed
    if (!wavesurfer.current) {
      // Clean up the previous instance
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }

      createWaveSurfer().then((instance) => {
        wavesurfer.current = instance;
        if (wavesurfer.current) {
          wavesurfer.current.load(audioFile); // Load the audio for this track
        }
        // Cleanup the instance when the component unmounts or if the audio file changes
        return () => {
          if (wavesurfer.current && audioFile) {
            playPause();
            wavesurfer.current.destroy();
            wavesurfer.current = null; // Clear the instance to allow recreation
          }
        };
      });
    }
  }, [audioFile, wavesurfer.current]);

  useEffect(() => {
    if(wavesurfer.current){
      console.log(wavesurfer.current.media)
    }
    // If the audio is playing and corresponds to this visualizer instance, update the time
    if (wavesurfer.current && isPlaying) {
      wavesurfer.current.setTime(currentTime);
    }

    return () => {
      if (wavesurfer.current) {
        playPause();
        wavesurfer.current.destroy();
        wavesurfer.current = null; // Clear the instance to allow recreation
      }
    };
    
  }, [isPlaying, currentTime, audioFile]);

  return (
    <div ref={contextWaveFormRef} className="w-full max-w-2xl ">
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
