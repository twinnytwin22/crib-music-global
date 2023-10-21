"use client";
//import CollectCardMenu from "ui/Cards/Collect/CollectCardMenu";
import { getCoverImage } from "@/lib/site/constants";
import { downloadFile } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import PlayButton from "../PlayButton";
const MusicItem = ({ song }: any) => {
  //const imageHash = "image" || null;
  const router = useRouter();

  const getSong = async (song) => {
    try {
      const songFile = await downloadFile({
        path: song?.music_file_url,
        bucket: "tracks",
      });
      return songFile;
    } catch (error) {
      throw error;
    }
  };

  const { data } = useQuery({
    queryKey: ["data", song],
    queryFn: () => getSong(song),
    enabled: !!song.music_file_url,
  });

 // console.log(data, "SONG");
const imageHash = getCoverImage(song?.cover_art_url)
  return (
    <tr
      key={song.title}
      className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs md:text-sm min-w-full font-work-sans"
    >
      <th
        scope="row"
        className="flex items-center px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
      >
        <div className="block min-w-[40px] min-h-[40px] relative rounded-md bg-zinc-500 w-fit mr-2">
      <Image
                        src={imageHash}
                        className="object-cover w-10 h-10 rounded-md"
                        width={40}
                        height={40}
                        alt="Song"
                        placeholder="blur"
                        blurDataURL="/images/blur.png"
                    /> 
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50">
            <PlayButton song={song} audio={data} />
          </div>
        </div>
      </th>
      <td
        onClick={() => router.push(`/song/${song?.slug}`)}
        className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
      >
        {song?.title}
      </td>
      <td
        //  onClick={() => router.push(`/${profile?.username}`)}
        className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
      >
        {song?.artist_name}
      </td>
      <td className="px-4 py-2">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          {song.genre}
        </span>
      </td>
      <td className="px-4 py-2">
        <button className="bg-black hover:bg-zinc-950 text-primary-800 text-xs font-medium px-2 py-1.5 rounded dark:bg-primary-900 dark:text-primary-300">
          License
        </button>
      </td>
      <td className="">
        <BsThreeDots />
      </td>
    </tr>
  );
};

export default MusicItem;
