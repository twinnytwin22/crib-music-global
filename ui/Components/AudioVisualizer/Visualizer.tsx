'use client'
import { useSubportPlayer } from 'app/context/subport-player';
import { usePlayerStore } from 'app/context/subport-player/PlayerLogic';
import { useEffect, useRef } from 'react';
///import WaveSurfer from 'wavesurfer.js';

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#FCA5A5",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
 // responsive: true,
  height: 35,
 // normalize: true,
 // partialRender: true
});


function AudioVisualizer({ audioFile }) {
  const {
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    
  } = usePlayerStore();
  const { play, stop } = useSubportPlayer();
  const waveformRef = useRef<any>(null);
  const wavesurfer = useRef<any>(null);
  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    const options = formWaveSurferOptions(waveformRef?.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(audioFile);
    return wavesurfer?.current
  };

//   const { data, error } = useQuery({
//     queryKey:['data'],
//   queryFn:() => create(), 
//   enabled: !!waveformRef.current, 
//   onSuccess: (data) => {
//       data.destroy();
    
// }} );

  //const [audio, setAudio] = useState<any>(null)
  // useEffect(() => {
  //   create();
  //   return () => {
  //     if (wavesurfer.current) {
  //       wavesurfer.current.destroy();
  //     }
  //   };
  // }, []);


  // Access the player store state and actions

  useEffect(() => {
    create();
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioFile]); // Listen to changes in audioFile

  useEffect(() => {
    // Define a function to update play state based on isPlaying
    const updatePlayState = () => {
      if (isPlaying) {
        wavesurfer.current?.play();
      } else {
        wavesurfer.current?.pause();
      }
    };

    // Add an event listener to Wavesurfer to update play state
    wavesurfer.current?.on('play', () => {
      play()
    });
    wavesurfer.current?.on('stop', () => {
      stop()
    });

    // Call the function to set the initial play state
    updatePlayState();
  }, [isPlaying]);

 
  return (
    <div ref={waveformRef} className='w-full max-w-2xl '>
      {/* The waveform will be displayed here */}
    </div>
  );
}

export default AudioVisualizer;
