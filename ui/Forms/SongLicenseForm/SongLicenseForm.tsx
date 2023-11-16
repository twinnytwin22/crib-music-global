"use client";
import { createQueryString } from "@/lib/hooks/createQueryString";
import { getAllSongs } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useLicensingStore } from "ui/Buttons/LicenseButton/LicenseButtonStore";
import BusinessLicenseForm from "./BusinessLicenseForm";
import {
  forBusinessList,
  forCreatorsList,
  forCreatorsSub,
  sampleText,
} from "./lib";

const SongLicenseForm = () => {
  const searchParams = useSearchParams();
  const id: string = searchParams.get("id")!;
  const business = searchParams.get("business");
  const url = createQueryString(searchParams);
  const { licenseWindowOpen  } = useLicensingStore()
  const router = useRouter();
  const pathname = usePathname();
  const handleBusinessClick = () => {
    router.push(pathname + "?" + url("business", "song"), { scroll: false });
  };
  const { data: songs, isLoading, isFetching, isSuccess, isPending } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getAllSongs(),
    refetchOnMount: false,
    enabled: !!!id && licenseWindowOpen,
  });
  const song =
    songs?.songs?.find((currentSong:{ id: string}) => currentSong?.id === id) ||
    songs?.find((currentSong: {id: string}) => currentSong?.id === id);

    const loading =  isLoading || isFetching || isFetching
  // console.log(songs, id)
  const renderStep1 = () => {

    return (
     !loading && isSuccess && song.title && (
        <div className="py-8  px-4 mx-auto max-w-full">
          <h2 className="mb-4 text-2xl font-medium text-center text-zinc-900 dark:text-white font-owners">
            {song?.title} - {song?.artist_name}
          </h2>
          <div className="grid grid-cols-2 p-4">
            <div className="border-r border-zinc-300 dark:border-zinc-800">
              <h2 className="text-center font-bold">Genres:</h2>
              <div className="flex space-x-2 mx-auto text-center w-full justify-center text-xs ">
                {song?.genres.map((genre, index) => (
                  <React.Fragment key={genre}>
                    <p>
                      {genre}
                      {index !== song.genres.length - 1 ? "," : ""}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-center font-bold">Moods:</h2>
              <div className="flex space-x-2 mx-auto text-center w-full justify-center text-xs ">
                {song?.moods.map((mood, index) => (
                  <React.Fragment key={mood}>
                    <p>
                      {mood}
                      {index !== song.moods.length - 1 ? "," : ""}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="relative  space-y-4">
            {process.env.NODE_ENV === "development" && (
              <div className="h-fit w-full flex flex-col space-y-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 duration-300 ease-in-out border  border-zinc-200 dark:border-zinc-800 rounded">
                <h2 className="text-lg font-semibold text-center">
                  For Creators
                </h2>
                <p className="text-sm text-center max-w-sm mx-auto">
                  {forCreatorsSub}
                </p>
                <p className="text-xs text-center max-w-sm mx-auto">
                  {forCreatorsList}
                </p>

                <button className="bg-zinc-100 mx-auto dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded">
                  Boy Now
                </button>
              </div>
            )}
            <div className="w-full md:h-52 flex-col flex space-y-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 duration-300 ease-in-out border rounded border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-center">
                {process.env.NODE_ENV === "development"
                  ? "For Business"
                  : "License Song"}
              </h2>
              <p className="text-sm text-center max-w-sm mx-auto">
                {sampleText}
              </p>
              <p className="text-xs text-center max-w-sm mx-auto">
                {forBusinessList}
              </p>

              <button
                onClick={handleBusinessClick}
                className="bg-zinc-100 mx-auto dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  const renderBusinessStep1 = () => {
    return (
      <section className="">
        <div className="py-8  px-4 mx-auto max-w-full">
          <h2 className="mb-4 text-2xl tracking-tight font-semibold text-center text-zinc-900 dark:text-white">
            Business License Inquiry
          </h2>
          <p className="mb-8 font-light text-center text-zinc-500 dark:text-zinc-300 ">
            Fill out the following information and our team with reach out with
            a quote within 24 hours.
          </p>

          <h2 className="mb-4 text-xl tracking-tight font-semibold text-center text-zinc-900 dark:text-white">
            {song?.title} - {song?.artist_name}
          </h2>
          <BusinessLicenseForm song={song} />
        </div>
      </section>
    );
  };
  return (
    <div>
      {!business && renderStep1()}
      {business && renderBusinessStep1()}
    </div>
  );
};

export default SongLicenseForm;
