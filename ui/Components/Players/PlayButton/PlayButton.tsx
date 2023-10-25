"use client";
import { getSong } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import { useSubportPlayer } from "app/context/subport-player";
import React from "react";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";

function PlayButton({ song, audio }: any) {
  const {
    play,
    isPlaying,
    stop,
    updateAudioUrl,
    updateImageUrl,
    audioUrl,
    updateMetaData,
  } = useSubportPlayer();
  const getCoverImage = (fileName: string) => {
    const imagePath ='/song_covers/' + fileName
    return imagePath
  };
  //const { user } = useAuthProvider();
  const newMetaData = song.metaData;
  const newImageUrl = getCoverImage(song?.cover_art_url);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { data } = useQuery({
    queryKey: ["data", song],
    queryFn: () => getSong(song),
    enabled: !!song.music_file_url && !audio,
    refetchOnMount: false, 
    onSuccess: (data) => {

    }
  });

  const newAudioUrl = data || audio;
//console.log(newAudioUrl)
  const handlePlay = async () => {
    if (audioUrl !== newAudioUrl) {
      if (isPlaying) {
        stop();
      }
      updateImageUrl(newImageUrl);
      updateAudioUrl(newAudioUrl);
      updateMetaData(newMetaData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      play();
    } else {
      play();
    }
  };

  return (
  (
      <>
        {mounted && isPlaying && audioUrl === newAudioUrl ? (
          <div
            onClick={stop}
            className="hover:scale-110 duration-300 ease-in-out "
          >
            <FaStopCircle
              size={48}
              className="text-white opacity-80 cursor-pointer"
            />
          </div>
        ) : (
          <div
            onClick={handlePlay}
            className="hover:scale-110 duration-300 ease-in-out transform "
          >
            <FaPlayCircle
              size={48}
              className="text-white opacity-80 cursor-pointer"
            />
          </div>
        )}
      </>
    )
  );
}

export default PlayButton;
