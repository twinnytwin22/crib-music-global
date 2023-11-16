"use client";
import { ScrollingTruncatedText, truncateText } from "@/lib/hooks/truncateText";
//import { useAuthProvider } from "app/context/auth";
import { useSubportPlayer } from "app/context/subport-player";
import { useHandleOutsideClick } from "lib/hooks/handleOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
const FooterPlayer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useHandleOutsideClick(isDrawerOpen, setIsDrawerOpen, "player-drawer");
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // const closeDrawer = () => {
  //   setIsDrawerOpen(false);
  // };
  // const [screenWidth, setScreenWidth] = useState(0);

  // // Step 2: Create a function to update the screen width state
  // const updateScreenWidth = () => {
  //   setScreenWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   // Update the screen width state when the component mounts
  //   updateScreenWidth();

  //   // Attach an event listener to window resize to update the screen width state
  //   window.addEventListener("resize", updateScreenWidth);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", updateScreenWidth);
  //   };
  // }, []);
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
    prevVolume,
    setVolume,
    mute,
  } = useSubportPlayer();

  const handleMute = () => {
    setMute();
  };
  //  console.log(imageUrl, "IMAGE FROM FOOTER")

  const truncatedTitle = truncateText({
    text: metaData?.title?.toString(),
    maxLength: 12,
  });
  const truncatedArtistName = truncateText({
    text: metaData?.artist_name?.toString(),
    maxLength: 15,
  });
  // console.log(imageUrl)

  //console.log(metaData)

  return (
    <footer className="cursor-pointer sm:cursor-default font-work-sans text-xs md:text-sm">
      <div
        className={`fixed bottom-0 left-0 right-0 z-[250] border-zinc-200 dark:border-zinc-800 md:px-6 py-2.5 border-t w-full bg-white dark:bg-black ${
          audioRef && audioUrl ? "block" : "hidden md:block"
        }`}
      >
        <div className="z-[300] w-full px-2.5 md:px-6 py-2.5  mx-auto relative  items-center place-items-center h-12">
          {audioRef && audioUrl && (
            <div className="player-drawer flex items-center justify-between max-w-screen-2xl mx-auto w-full">
              <audio
                ref={audioRef}
                id="music-player"
                controls={false}
                className=""
              >
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="px-4 text-xs w-fit flex flex-col md:w-40 md:min-w-[150px] relative">
                <ScrollingTruncatedText
                  text={metaData?.title.toString()}
                  maxLength={12}
                />
                <p
                  className={`scrolling-text-div w-fit ${
                    metaData && metaData?.artist_name?.length > 15
                      ? "scrolling-text-effect"
                      : ""
                  }`}
                >
                  {" "}
                  {metaData ? truncatedArtistName : ""}
                </p>
              </div>
              <div className="mx-auto w-full space-x-2 md:space-x-4 relative flex items-center ">
                {!imageUrl ? (
                  <div
                    onClick={toggleDrawer}
                    className="max-w-[30px] h-[30px] rounded-md bg-red-200 w-full"
                  ></div>
                ) : (
                  <Link href={"/song/" + metaData.id}>
                    <Image
                      src={imageUrl}
                      alt="song-image"
                      width={30}
                      height={30}
                      blurDataURL={"/site_images/stock/blur.png"}
                      className="aspect-square object-cover rounded-md"
                    />
                  </Link>
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
                <div className="block ">{formatTime(currentTime)}</div>
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
                <div className="sm:block hidden">
                  {isMuted ? (
                    <HiSpeakerXMark
                      className="text-black dark:text-white text-2xl"
                      onClick={handleMute}
                    />
                  ) : (
                    <HiSpeakerWave
                      className="text-black dark:text-white text-2xl"
                      onClick={handleMute}
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
