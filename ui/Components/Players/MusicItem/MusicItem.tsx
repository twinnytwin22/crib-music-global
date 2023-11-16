"use client";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import LicenseButton from "ui/Buttons/LicenseButton/LicenseButton";
import PlayButton from "../PlayButton";
import MenuItemMenu from "./MenuItemMenu";

const MusicItem = ({ song }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  useHandleOutsideClick(isOpen, setIsOpen, `collect-menu${song.id}`);

  const handleMenuClick = () => {
    setIsOpen((prevState) => !prevState);
    // console.log(open)
  };
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
            src={"/song_covers/" + song.cover_art_url}
            className="object-cover w-10 h-10 rounded-md"
            width={40}
            height={40}
            alt="Song"
            placeholder="blur"
            blurDataURL="/images/blur.png"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50">
            <PlayButton song={song} />
          </div>
        </div>
      </th>
      <td
        onClick={() => router.push(`/song/${song?.id}`)}
        className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
      >
        {song?.title}
      </td>
      <td
        onClick={() => router.push(`/artist/${song.artist_id}`)}
        className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
      >
        {song?.artist_name}
      </td>
      <td className="px-4 py-2">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          {song.genres[0]}/{song.moods[0]}
        </span>
      </td>
      <td className="px-4 py-2">
        <LicenseButton song={song} id={song.id} />
      </td>
      <td
        className={`collect-menu${song.id} relative`}
        onClick={handleMenuClick}
      >
        <BsThreeDots />
        {isOpen && <MenuItemMenu song={song} />}
      </td>
    </tr>
  );
};

export default MusicItem;
