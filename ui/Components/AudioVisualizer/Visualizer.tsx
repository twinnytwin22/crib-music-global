'use client'
import { useSubportPlayer } from 'app/context/subport-player';
import { usePlayerStore } from 'app/context/subport-player/PlayerLogic';
import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

function AudioVisualizer({ audioFile }) {
  const waveformRef = useRef<any>(null);
  const wavesurferRef = useRef<any>(null);

  // Access the player store state and actions
  const {
    isPlaying,
    setCurrentTime,
    setDuration,
  } = usePlayerStore();
  const { play, stop } = useSubportPlayer();

  useEffect(() => {
    if (!audioFile) return;

    // Create Wavesurfer instance if it doesn't exist

      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#9CA3AF',
        progressColor: '#4B5563',
        barWidth: .4,
        barHeight: 0.2,
      });

      wavesurferRef.current = wavesurfer;

      // Add event listeners for Wavesurfer
      wavesurfer.on('play', () => {
        play();
      });

      wavesurfer.on('pause', () => {
        stop();
      });

      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration());
      });

      // Load the audio file
      wavesurfer.load(audioFile);
 

    return () => {
      // Stop and destroy the Wavesurfer instance on unmount
      wavesurferRef.current.stop();
      wavesurferRef.current.destroy();
    };
  }, [audioFile]);

  return (
    <div ref={waveformRef} className='w-full max-w-2xl h-fit'>
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
