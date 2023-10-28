'use client'
import { useSubportPlayer } from 'app/context/subport-player';
import { usePlayerStore } from 'app/context/subport-player/PlayerLogic';
import { useEffect, useRef } from 'react';
///import WaveSurfer from 'wavesurfer.js';


function AudioVisualizer({ audioFile }) {
  const {
    isPlaying,
    currentTime
  } = usePlayerStore();
  const { audioRef, audioUrl, wavesurfer, contextWaveFormRef } = useSubportPlayer();
  const waveformRef = useRef<any>(null);

  useEffect(() => {
    
    if(wavesurfer.current && audioFile === audioUrl){
      wavesurfer.current.setTime(currentTime)
    }

   
  }, [isPlaying, currentTime, audioUrl, audioFile]);
 
  return (
    <div ref={contextWaveFormRef} className='w-full max-w-2xl '>
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
