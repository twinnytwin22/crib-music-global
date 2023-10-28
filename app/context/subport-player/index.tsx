"use client";
import {
    Suspense,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from "react";
import WaveSurfer from "wavesurfer.js";
import {
    formWaveSurferOptions,
    formatTime,
    handleLoadedData,
    handlePause,
    handlePlay,
    handleSeekChange,
    handleStop,
    handleTimeUpdate,
    handleVolumeChange,
    useAudio,
    useInterval,
    usePlaybackTime,
    usePlayerStore,
    useSetupAudio,
} from "./PlayerLogic";
// Create the player context
export const SubportPlayerContext = createContext<any>(null);

// Create a custom provider component
export const SubportPlayer = ({ children
}: {
    children: React.ReactNode
}) => {
    const {
        currentTime,
        isPlaying,
        audio,
        volume,
        isMuted,
        prevVolume,
        setCurrentTime,
        setPosition,
        setDuration,
        setIsPlaying,
        setAudio,
        setVolume,
        setIsMuted,
        setPrevVolume,
        audioUrl,
        setAudioUrl,
        imageUrl,
        setSongImage,
        setMetaData,
        metaData
    } = usePlayerStore();
    const audioRef = useRef<any>(audio);
   // const audioContext = new (window.AudioContext)();
   const wavesurfer = useRef<any>(null);
   const contextWaveFormRef = useRef<any>(null);
   const create = () => {
    const options = formWaveSurferOptions(contextWaveFormRef?.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(audioUrl);
    wavesurfer.current.setMuted(true); // Set volume to 1 (full volume)
    return wavesurfer?.current
  };
//  console.log("audioFile:", audioFile, 'audioUrl:', audioUrl)

  useEffect(() => {
    if(wavesurfer.current && audioUrl){
    create();}  
  }, [audioUrl]); 


  

  
    useAudio(audioUrl, setAudio);

    const onLoadedData = useCallback(() => {
        // Set the duration or perform any necessary audio setup
    }, []);
    useSetupAudio(audioRef, audioUrl, onLoadedData);

    usePlaybackTime(audioRef);

    const play = () => {
        handlePlay(audioRef, setIsPlaying);
    };

    // Event handler for pause button
    const pause = () => {
        handlePause(audioRef, setIsPlaying);
    };

    // Event handler for stop button
    const stop = () => {
        handleStop(audioRef, setIsPlaying);
    };

    const timeUpdate = () => {
        handleTimeUpdate(audioRef, setPosition);
    };
    const dataLoad = () => {
        handleLoadedData(audioRef, setDuration);
    };

    const seekChange = () => {
        handleSeekChange(event, audioRef);
    };

    const volumeChange = () => {
        handleVolumeChange(event, audioRef, setVolume);
    };

    const setMute = () => {
        if (isMuted) {
            setVolume(prevVolume); // Unmute: set volume to previous volume
        } else {
            setPrevVolume(volume); // Save the current volume before muting
            setVolume(0); // Mute: set volume to 0
        }
        setIsMuted(!isMuted); // Toggle the mute state
    };

    usePlaybackTime(audioRef);
    useInterval(audioRef, setCurrentTime, isPlaying);


    const updateAudioUrl = useCallback(
        (newAudioUrl: string) => {
            setAudioUrl(newAudioUrl);
        },
        [setAudioUrl]
    );
    const updateImageUrl = useCallback(
        (newImageUrl: string) => {
            setSongImage(newImageUrl)
        },

        [setSongImage]
    );

    const updateMetaData = useCallback(
        (newMetadata: any) => {
            setMetaData(newMetadata)
        },

        [setMetaData]
    );




    // Define the value for the context provider
    const values = {
        updateAudioUrl,
        updateImageUrl,
        updateMetaData,
        metaData,
        audioUrl,
        imageUrl,
        setAudioUrl,
        audioRef,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        volumeChange,
        volume,
        isMuted,
        setMute,
        handlePlay,
        handlePause,
        handleStop,
        formatTime,
        handleTimeUpdate,
        handleLoadedData,
        handleSeekChange,
        useInterval,
        usePlaybackTime,
        setDuration,
        setPosition,
        timeUpdate,
        dataLoad,
        seekChange,
        play,
        pause,
        stop, 
        wavesurfer, 
        contextWaveFormRef
        // Other context values...
    };

    return (

        <SubportPlayerContext.Provider value={values}>
            <Suspense>{children}</Suspense>
        </SubportPlayerContext.Provider>
    );
};

// Custom hook to access the player context
export const useSubportPlayer = () => useContext(SubportPlayerContext);
