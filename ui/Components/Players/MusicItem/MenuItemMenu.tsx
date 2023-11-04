'use client'
import { copyToClipboard } from '@/lib/hooks/copyToClipboard';
import { usePathname } from 'next/navigation';
import { FaCopy, FaTwitter } from 'react-icons/fa6';

function MenuItemMenu({song}) {
    const path = usePathname();
    const shareUrl = "https://cribmusic.xyz/song/" +song.id;
  //console.log(song)f5ba6831-f44b-419d-aae9-668cb26b4771

const handleCopyClick = () => {
  copyToClipboard(shareUrl);
};
  return (
    <div className={`collect-menu${song.id} absolute isolate right-0 mt-1 pl-8 `}>
    <ul className="w-48 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md dark:bg-zinc-900 dark:border-zinc-700 dark:text-white opacity-90 shadow-sm shadow-zinc-500 ">
      <li className="w-full px-4 py-2 flex justify-between border-b border-zinc-200 rounded-t-lg dark:border-zinc-600 hover:dark:bg-zinc-700">
        Share on Twitter
        <FaTwitter />
      </li>
      <li
        onClick={handleCopyClick}
        className="w-full px-4 py-2 flex justify-between border-b border-zinc-200 dark:border-zinc-600 hover:dark:bg-zinc-700"
      >
        Copy Link <FaCopy />
      </li>
      <li className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-zinc-700">
        Report
      </li>
    </ul>
  </div>  )
}

export default MenuItemMenu