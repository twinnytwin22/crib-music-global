"use client";
import {
    Suspense,
    createContext,
    useCallback,
    useContext,
    useRef
} from "react";
import WaveSurfer from "wavesurfer.js";
import {
    formWaveSurferOptions,
    formatTime,
    handleLoadedData,
    handleMute,
    handlePause,
    handlePlay,
    handlePlayPause,
    handleSeekChange,
    handleStop,
    handleTimeUpdate,
    handleUnMute,
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
        metaData,
    } = usePlayerStore();
    const audioRef = useRef<any>(audio);
   // const audioContext = new (window.AudioContext)();
   const wavesurfer = useRef<any>(null);
   const contextWaveFormRef = useRef<any>(null);
   const createWaveSurfer = () => {
    return new Promise((resolve) => {
    const options = formWaveSurferOptions(contextWaveFormRef?.current);
    const instance = WaveSurfer.create(options); // Set volume to 1 (full volume)
    resolve(instance)
  })};
//  console.log("audioFile:", audioFile, 'audioUrl:', audioUrl)
  

    const mute = () => {
        handleMute(0, audioRef, setVolume)
    }
    useAudio(audioUrl, setAudio);
    const onLoadedData = useCallback(() => {
        // Set the duration or perform any necessary audio setup
    }, []);
    useSetupAudio(audioRef, audioUrl, onLoadedData, prevVolume, volume, setPrevVolume);

    usePlaybackTime(audioRef);

    const play = () => {
        handlePlay(audioRef, setIsPlaying);
    };

    // Event handler for pause button
    const pause = () => {
        handlePause(audioRef, setIsPlaying);
    };

    const playPause = () => {
        handlePlayPause(audioRef, setIsPlaying)
    }
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
           handleUnMute(prevVolume, audioRef, setVolume) //ute: set volume to previous volume
        } else {
            setPrevVolume(volume)
            handleMute(0, audioRef, setVolume)
           // setPrevVolume(volume); // Save the current volume before muting
           // setVolume(0); // Mute: set volume to 0
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


    // useEffect(() => {
        
    // }, [isPlaying])

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
        mute,
        wavesurfer, 
        contextWaveFormRef, createWaveSurfer, playPause
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
