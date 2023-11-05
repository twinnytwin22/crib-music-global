'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer() {
  const image = "/site_images/crib-logo.png";
  const pathname = usePathname()
  return (
    <section className="p-4 bg-white sm:p-6 text-sm dark:bg-black relative border-t border-zinc-300 dark:border-zinc-800">
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
          <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3 font-work-sans">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-zinc-900 uppercase dark:text-white font-owners">
                Resources
              </h2>
              <ul className="text-zinc-600 dark:text-zinc-400">
                <li >
                  <Link
                  scroll={false}
                    href={pathname + '/?contact=artist-submission'}
                    className="hover:underline"
                  >
                    Submit Music
                    </Link>
                </li>
                <li >
                <Link
                    href="https://cribnetwork.io"
                    className="hover:underline"
                  >
                    Crib Network
                  </Link>
                </li>
                <li className="">
                <Link
                   // prefetch={false}
                   // scroll={false}
                    href="/#faq"
                    className="hover:underline"
                  >
                    FAQs
                  </Link>
                </li>
                <li >
                <Link
                    href="https://syncos.cribmusic.xyz"
                    className="hover:underline"
                  >
                    Sync OS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-zinc-900 uppercase dark:text-white font-owners">
                Follow us
              </h2>
              <ul className="text-zinc-600 dark:text-zinc-400">
                <li className="">
                  <Link
                    href="https://instagram.com/cribmusicglobal"
                    className="hover:underline "
                  >
                    Instagram
                  </Link>
                </li>
                <li className="">
                  <Link
                    href="https://instagram.com/cribmusicglobal"
                    className="hover:underline "
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.com/invite/2kRJmu3RYS"
                    className="hover:underline"
                  >
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-zinc-900 uppercase dark:text-white  font-owners">
                Legal
              </h2>
              <ul className="text-zinc-600 dark:text-zinc-400">
                <li className="">
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
            © 2023{" "}
            <a href="https://cribnetwork.io" className="hover:underline">
              CRIB Music Global™, CRIB LLC, Crib Network
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link
            href="https://facebook.com"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <FaFacebook />{" "}
            </Link>
            <Link
               href="https://instagram.com/cribmusicglobal"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <FaInstagram />{" "}
            </Link>
            <Link
                href="https://x.com/"
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
