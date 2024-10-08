"use client";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import DarkModeSwitch from "@/ui/Components/DarkModeSwitch/DarkModeSwitch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import ContactButton from "ui/Buttons/ContactButton/ContactButton";
import { create } from "zustand";
const useMobileMenuStore = create((set: any) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state: { isMobileMenuOpen: any }) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),
}));

function NavBar() {
  const image = "/site_images/crib-logo.png";
  //const isHidden = false
  const pathname = usePathname();
  const isMusicPage = pathname.startsWith("/music");
  ///console.log(isMusicPage)
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore();

  useHandleOutsideClick(isMobileMenuOpen, toggleMobileMenu, "mobile-menu");

  return (
    <nav className="bg-white dark:bg-black fixed w-full z-[9000] top-0 left-0 border-b border-zinc-200 dark:border-zinc-700 mx-auto">
      <div
        className={` max-w-screen flex flex-wrap items-center justify-between mx-auto px-4  xl:px-8 py-4 `}
      >
        <Link href="/" className="flex flex-col ">
          <Image
            src={image}
            className="h-12  mx-3 xl:mx-auto invert dark:invert-0 w-auto"
            alt="Crib Logo"
            width={145}
            height={100}
            priority
          />
        </Link>
        <div className="flex md:order-2 gap-4 items-center w-auto">
          <div className="hidden md:block">
            <DarkModeSwitch />
          </div>
          <div className="hidden md:block">
            <ContactButton />
          </div>

          {/* <ContactButton /> */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-zinc-500 rounded-sm md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400  dark:focus:ring-zinc-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <FiMenu className="text-2xl" />
          </button>
        </div>
        <div
          className={`items-center justify-between w-full relative z-50 md:flex md:w-auto md:order-1 mobile-menu ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium font-work-sans rounded-sm md:flex-row md:space-x-12 md:mt-0 md:border-0 md:ml-24 select-none">
            <li>
              {/* Existing menu item */}
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
              >
                Home
              </Link>
            </li>
            <li className="">
              <Link
                href="/music"
                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
              >
                Music
              </Link>
            </li>
            <li className="relative">
              {/* Services menu item with submenu */}
              <div
                className="relative group drop-dizzle font-work-sans"
                //  onMouseEnter={() => setIsSubMenuOpen(true)}
                //   onMouseLeave={() => setIsSubMenuOpen(false)}
              >
                <Link
                  href={"/services"}
                  className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
                >
                  Services
                </Link>
                {/* Submenu */}
              </div>
            </li>
            <li hidden className="relative">
              {/* Services menu item with submenu */}
              <div
                className="relative group drop-dizzle font-work-sans"
                //  onMouseEnter={() => setIsSubMenuOpen(true)}
                //   onMouseLeave={() => setIsSubMenuOpen(false)}
              >
                <Link
                  href={"/playlists"}
                  className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
                >
                  Playlists
                </Link>
                {/* Submenu */}
              </div>
            </li>
            <li className="hidden">
              {/* Other menu items */}
              <a
                href="#tech"
                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
              >
                Technology
              </a>
            </li>

            <li className="block md:hidden">
              <Link
                href={pathname + "/?contact=inquiry"}
                className="block py-2 pl-3 pr-4 text-zinc-900 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hover:bg-transparent md:hover:text-zinc-700 md:p-0 md:dark:hover:text-zinc-500 dark:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 ease-in-out duration-300"
              >
                Contact
              </Link>
            </li>
            <li className="flex md:hidden py-2 pl-3 pr-4 items-center justify-start w-fit gap-3 ">
              Color Mode:
              <DarkModeSwitch />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
