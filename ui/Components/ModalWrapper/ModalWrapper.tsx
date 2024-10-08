"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useLicensingStore } from "ui/Buttons/LicenseButton/LicenseButtonStore";
import useFormStateContext from "ui/Forms/formContext";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { licenseWindowOpen, setLicenseWindowOpen, song } = useLicensingStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const getParam = (param: string) => searchParams.get(param);
  const license = getParam("license");
  const contact = getParam("contact");
  const open = licenseWindowOpen || license || contact;
  const router = useRouter();
  const { reset, setStep } = useFormStateContext();

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center select-none  ${
        open ? "translate-x-0 " : "translate-x-full"
      } `}
    >
      <div
        className={`fixed inset-0 max-w-screen w-full  bg-black opacity-50 ${
          open ? "visible " : "invisible"
        }`}
      ></div>
      <div
        className={`license-modal bg-zinc-50 right-0 fixed dark:bg-black max-w-sm md:max-w-lg h-full  xl:top-20 w-full mx-auto border rounded border-zinc-200 dark:border-zinc-800 p-4 duration-300 ease-in-out ${
          open ? "translate-x-0 " : "translate-x-full"
        } `}
      >
        <div
          onClick={() => {
            // removeParams();
            reset();
            setLicenseWindowOpen(false);
            setStep(1);
            router.push(pathname, { scroll: false });
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

export default ModalWrapper;
