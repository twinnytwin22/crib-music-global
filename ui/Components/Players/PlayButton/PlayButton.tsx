"use client";
import { getSong } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import { useSubportPlayer } from "app/context/subport-player";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
export function extractSongURL(fullURL: string) {
  if (fullURL) {
    const url = new URL(fullURL);
    const path = url?.pathname; // Extract the path without the token
    return `https://${url.host}${path}`;
  }
}
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
    const imagePath = "/song_covers/" + fileName;
    return imagePath;
  };

  //const { user } = useAuthProvider();
  const newMetaData = {
    title: song.title,
    artist_name: song.artist_name,
    id: song.id,
    play_count: song.play_count,
  };
  const newImageUrl = getCoverImage(song?.cover_art_url);
  //const [mounted, setMounted] = React.useState(false);
  //React.useEffect(() => setMounted(true), []);
  const { data } = useQuery({
    queryKey: ["data", song],
    queryFn: () => getSong(song),
    enabled: !!song.music_file_url && !audio,
    //  refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const newAudioUrl = audio || data;
  //console.log(newAudioUrl)
  const handlePlay = async () => {
    if (extractSongURL(audioUrl) !== extractSongURL(newAudioUrl)) {
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

  //console.log(audioUrl, newAudioUrl)

  return (
    <>
      {isPlaying && extractSongURL(audioUrl) === extractSongURL(newAudioUrl) ? (
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
  );
}

export default PlayButton;
