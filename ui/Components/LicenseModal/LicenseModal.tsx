import { AiOutlineCloseCircle } from 'react-icons/ai';
export const LicenseModal = ({ handleClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center mx-8">
      <div className="fixed inset-0  bg-black opacity-50"></div>
      <div className="bg-zinc-50 dark:bg-black relative max-w-lg w-full mx-auto border rounded border-zinc-200 dark:border-zinc-800 p-4 ">
        <div onClick={handleClose} className="w-6 absolute top-3 left-3 z-[99999] text-black dark:text-white">
       <AiOutlineCloseCircle/>
        </div>
        <div className="mx-auto flex w-full justify-around place">
          <div className="h-48 w-full flex flex-col">
            <h2 className="text-lg font-semibold text-center">
                Non-Exclusive License</h2>
            <button className="bg-zinc-100 mx-auto dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded">
              Boy Now
            </button>
          </div>
          <div className='w-full h-48 flex-col flex'>
          <h2 className="text-lg font-semibold text-center">
                Exclusive License</h2>

            <button className="bg-zinc-100 mx-auto dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseModal;
