"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useLicensingStore } from "ui/Buttons/LicenseButton/LicenseButtonStore";
import ArtistSubmitForm from "ui/Forms/ArtistSubmitForm/ArtistSubmitForm";
import ContactForm from "ui/Forms/ContactPageForm";
import CustomMusicForm from "ui/Forms/CustomMusicForm";
import SongLicenseForm from "ui/Forms/SongLicenseForm";
export const LicenseModal = () => {
  const { song } = useLicensingStore();

  const searchParams = useSearchParams();
  const getParam = (param: string) => searchParams.get(param);
  const license = getParam("license");
  const contact = getParam("contact");
  //console.log(license);

  return (
    <ModalWrapper>
      {license === "song" && <SongLicenseForm />}
      {license === "custom" && <CustomMusicForm />}
      {contact === "inquiry" && <ContactForm />}
      {contact === "artist-submission" && <ArtistSubmitForm />}
    </ModalWrapper>
  );
};

export default LicenseModal;

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { licenseWindowOpen, setLicenseWindowOpen, song } = useLicensingStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const getParam = (param: string) => searchParams.get(param);
  const license = getParam("license");
  const contact = getParam("contact");
  const open = licenseWindowOpen || license || contact;
  const router = useRouter();

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center  ${
        open ? "translate-x-0 " : "translate-x-full"
      } `}
    >
      <div
        className={`fixed inset-0 max-w-screen w-full  bg-black opacity-50 ${
          open ? "visible " : "invisible"
        }`}
      ></div>
      <div
        className={`license-modal bg-zinc-50 right-0 fixed dark:bg-black max-w-sm md:max-w-lg h-full  top-20 w-full mx-auto border rounded border-zinc-200 dark:border-zinc-800 p-4 duration-300 ease-in-out ${
          open ? "translate-x-0 " : "translate-x-full"
        } `}
      >
        <div
          onClick={() => {
            // removeParams();
            setLicenseWindowOpen(false);
            router.push(pathname);
          }}
          className="w-6 absolute top-3 left-3 z-[99999] text-black dark:text-white scale-150"
        >
          <AiOutlineCloseCircle />
        </div>
        {children}
      </div>
    </div>
  );
};
