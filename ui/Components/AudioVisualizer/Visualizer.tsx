'use client'
import { useSubportPlayer } from 'app/context/subport-player';
import { usePlayerStore } from 'app/context/subport-player/PlayerLogic';
import { useEffect } from 'react';

function AudioVisualizer({ audioFile }) {
  const {
    isPlaying,
    currentTime, 
    audioUrl: currentAudioUrl
  } = usePlayerStore();
  const { audioUrl, wavesurfer, contextWaveFormRef, createWaveSurfer } = useSubportPlayer();

  useEffect(() => {
    // Create a WaveSurfer instance if it doesn't exist
    if (!wavesurfer.current || audioFile !== currentAudioUrl) {

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
      });
    }

    // If the audio file changes, update the instance
    // if (wavesurfer.current && audioFile !== audioUrl) {
    //   wavesurfer.current.load(audioFile);
    // }

    // If the audio is playing, update the time on the instance
    if (wavesurfer.current && isPlaying && audioFile === currentAudioUrl) {
      wavesurfer.current.setTime(currentTime);
    }

    // Cleanup the instance when the component unmounts
    return () => {
      if (wavesurfer.current && audioFile !== audioUrl ||wavesurfer.current && audioFile !== currentAudioUrl) {
        wavesurfer.current.destroy();
        wavesurfer.current = null; // Clear the instance to allow recreation
      }
    };
  }, [ currentTime, audioUrl, audioFile, currentAudioUrl]);

  return (
    <div ref={contextWaveFormRef} className='w-full max-w-2xl '>
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
