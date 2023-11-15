"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React from "react";
const ModalWrapper = dynamic(() => import('ui/Components/ModalWrapper'), { ssr: false })
const ArtistSubmitForm = dynamic(() => import("ui/Forms/ArtistSubmitForm"), { ssr: false });
const ContactForm = dynamic(() => import("ui/Forms/ContactPageForm"), { ssr: false });
const CustomMusicForm = dynamic(() => import("ui/Forms/CustomMusicForm"), { ssr: false });
const SongLicenseForm = dynamic(() => import("ui/Forms/SongLicenseForm"), { ssr: false });

export const LicenseModal = () => {

  const searchParams = useSearchParams();
  const getParam = (param: string) => searchParams.get(param);
  const license = getParam("license");
  const contact = getParam("contact");

  //console.log(license);

  return (
    <React.Fragment>
   
        <ModalWrapper>
          {license === "song" && <SongLicenseForm />}
          {license === "custom" && <CustomMusicForm />}
          {contact === "inquiry" && <ContactForm />}
          {contact === "artist-submission" && <ArtistSubmitForm />}
        </ModalWrapper>
    </React.Fragment>
  );
};

export default LicenseModal;
