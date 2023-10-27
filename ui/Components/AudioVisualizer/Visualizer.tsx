'use client'
import { useSubportPlayer } from 'app/context/subport-player';
import { usePlayerStore } from 'app/context/subport-player/PlayerLogic';
import { useEffect, useRef } from 'react';
///import WaveSurfer from 'wavesurfer.js';
const formWaveSurferOptions = (ref: any) => ({
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


function AudioVisualizer({ audioFile }) {
  const {
    isPlaying,
    currentTime
  } = usePlayerStore();
  const { audioRef, audioUrl } = useSubportPlayer();
 const waveformRef = useRef<any>(null);
  const wavesurfer = useRef<any>(null);
  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    const options = formWaveSurferOptions(waveformRef?.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(audioFile);
    wavesurfer.current.setMuted(true); // Set volume to 1 (full volume)

    return wavesurfer?.current
  };
  console.log("audioFile:", audioFile, 'audioUrl:', audioUrl, 'waveformRef:', waveformRef, 'audioRef:', audioRef)

  useEffect(() => {
    if(audioFile !== audioUrl){
    create();}
    return () => {
        wavesurfer.current?.destroy();
    };
  }, [audioFile]); // Listen to changes in audioFile

  useEffect(() => {
    if (isPlaying && audioFile === audioUrl) {
      wavesurfer.current?.play();
    } else {
      wavesurfer.current?.stop();
    }
    if(wavesurfer.current && audioFile === audioUrl){
      wavesurfer.current.setTime(currentTime)
    }

   
  }, [isPlaying, currentTime, audioUrl, audioFile]);
 
  return (
    <div ref={waveformRef} className='w-full max-w-2xl '>
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
