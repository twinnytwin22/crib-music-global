"use client";
//import { useAuthProvider } from "app/context/auth";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useSubportPlayer } from "app/context/subport-player";
import { useEffect, useState } from "react";
import { ScrollingTruncatedText, truncateText } from "lib/hooks/truncateText";
import Image from "next/image";
import { useHandleOutsideClick } from "lib/hooks/handleOutsideClick";
const FooterPlayer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useHandleOutsideClick(isDrawerOpen, setIsDrawerOpen, "player-drawer");
  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(true);
      return;
    } else {
      setIsDrawerOpen(false);
      return;
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const [screenWidth, setScreenWidth] = useState(0);

  // Step 2: Create a function to update the screen width state
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Update the screen width state when the component mounts
    updateScreenWidth();

    // Attach an event listener to window resize to update the screen width state
    window.addEventListener("resize", updateScreenWidth);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);
  //  const { user } = useAuthProvider();
  const {
    audioUrl,
    imageUrl,
    audioRef,
    isPlaying,
    volumeChange,
    volume,
    isMuted,
    setMute,
    timeUpdate,
    dataLoad,
    seekChange,
    formatTime,
    currentTime,
    play,
    pause,
    stop,
    metaData,
  } = useSubportPlayer();

  //  console.log(imageUrl, "IMAGE FROM FOOTER")

  const truncatedTitle = truncateText({
    text: metaData?.name?.toString(),
    maxLength: 12,
  });
  const truncatedArtistName = truncateText({
    text: metaData?.artist_name?.toString(),
    maxLength: 12,
  });

  return (
    <footer className="cursor-pointer sm:cursor-default">
      <div
        className={`fixed bottom-0 left-0 right-0 z-[250] border-zinc-200 dark:border-zinc-800 md:px-6 py-2.5 border-t w-full bg-white dark:bg-black ${
          audioRef && audioUrl ? "block" : "hidden md:block"
        }`}
      >
        <div className="z-[300] w-full px-6 py-2.5  mx-auto relative  items-center place-items-center h-12">
          {audioRef && audioUrl && (
            <div className="player-drawer flex items-center justify-between max-w-screen-xl mx-auto w-full">
              <audio
                ref={audioRef}
                id="music-player"
                controls={false}
                className=""
              >
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              {/* <div className="px-4 text-xs w-full flex flex-col md:w-40 min-w-[150px] relative">
                                    <ScrollingTruncatedText text={metaData.name.toString()} maxLength={12} />
                                    <h3 className={`scrolling-text-div ${metaData?.artist_name?.length > 12 ? 'scrolling-text-effect' : ''}`}>  {metaData ? truncatedArtistName : ''}</h3>
                                </div> */}
              <div className="mx-auto w-full space-x-4 relative flex items-center ">
                {!imageUrl ? (
                  <div
                    onClick={toggleDrawer}
                    className="max-w-[30px] h-[30px] rounded-md bg-red-200 w-full"
                  ></div>
                ) : (
                  <Image
                    src={imageUrl}
                    alt="song-image"
                    width={30}
                    height={30}
                    blurDataURL={"/images/stock/blur.png"}
                    className="aspect-square object-cover rounded-md"
                  />
                )}
                {!isPlaying && (
                  <button
                    onClick={play}
                    className="hover:scale-110 duration-200 ease-in-out isolate"
                  >
                    <FaPlay />
                  </button>
                )}
                {isPlaying && (
                  <button
                    onClick={pause}
                    className="hover:scale-110 duration-200 ease-in-out isolate"
                  >
                    <FaPause />
                  </button>
                )}
                <button
                  onClick={stop}
                  className="hover:scale-110 duration-200 ease-in-out isolate"
                >
                  <FaStop />
                </button>
                <div className="block ">
                  {formatTime(currentTime)}
                </div>
                <div className="sm:w-full block ">
                  <input
                    readOnly
                    type="range"
                    className=" accent-red-300 h-2.5 rounded-full w-full bg-zinc-300 dark:bg-zinc-500 appearance-none cursor-pointer "
                    min="0"
                    max={
                      !audioRef?.current?.duration
                        ? "0:00"
                        : audioRef?.current?.duration
                    }
                    value={audioRef?.current?.currentTime ?? ""}
                    onTimeUpdate={timeUpdate}
                    onLoadedData={dataLoad}
                    onChange={seekChange}
                  />
                </div>
                <div>
                  {!audioRef?.current?.duration
                    ? "0:00"
                    : formatTime(audioRef?.current?.duration)}
                </div>
                <div className="block ">
                  {isMuted ? (
                    <HiSpeakerXMark
                      className="text-black dark:text-white text-2xl"
                      onClick={setMute}
                    />
                  ) : (
                    <HiSpeakerWave
                      className="text-black dark:text-white text-2xl"
                      onClick={setMute}
                    />
                  )}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={volumeChange}
                  className="w-32 md:w-48 bg-zinc-200 accent-red-300 rounded-md cursor-pointer dark:bg-zinc-700 hidden sm:block  "
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterPlayer;
