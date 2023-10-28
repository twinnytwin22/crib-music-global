import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer() {
  const image = "/site_images/crib-logo.png";

  return (
    <section className="p-4 bg-white sm:p-6 dark:bg-black relative border-t border-zinc-300 dark:border-zinc-800">
      <div className="mx-auto max-w-screen-2xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex flex-col ">
              <Image
                src={image}
                className="h-12  mx-3 xl:mx-auto invert dark:invert-0 w-fit"
                alt="Crib Logo"
                width={145}
                height={100}
                priority
              />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-zinc-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-zinc-600 dark:text-zinc-400">
                <li className="mb-4">
                  <Link
                    href="https://cribnetwork.io"
                    className="hover:underline"
                  >
                    Crib Network
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Tailwind CSS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-zinc-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-zinc-600 dark:text-zinc-400">
                <li className="mb-4">
                  <Link
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-zinc-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-zinc-600 dark:text-zinc-400">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-zinc-200 sm:mx-auto dark:border-zinc-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-zinc-500 sm:text-center dark:text-zinc-400">
            © 2022{" "}
            <a href="https://cribnetwork.io" className="hover:underline">
              CRIB Music Global™, CRIB LLC, Crib Network
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link
              href="#"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <FaFacebook />{" "}
            </Link>
            <Link
              href="#"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <FaInstagram />{" "}
            </Link>
            <Link
              href="#"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <FaTwitter />{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
