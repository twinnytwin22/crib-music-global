import Image from "next/image";
import Button from "ui/Buttons/Button/Button";
import GoToMusicButton from "ui/Buttons/GoToMusicButton";

function AboutHome() {
  const image = "/site_images/globe-big_logo.svg";
  const imageLight = "/site_images/globe-big_logo-black.svg";
  const introP = `Our mission is clear: to empower musicians and creators, bridging the gap between the artistic and the visual. We simplify the intricacies of music licensing, administration, and supervision, ensuring that both musicians and film/video content creators have a seamless path to success. We're dedicated to safeguarding your rights and making your work resonate on a global stage, whether it's the music that sets the scene or the scene that elevates the music. We're here to help`;
  return (
    <section className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <Image
          src={imageLight}
          className=" block dark:hidden w-3/4 h-full mx-auto p-8"
          alt="Crib Logo"
          width={345}
          height={300}
          priority
        />
        <Image
          src={image}
          className=" hidden dark:block w-3/4 h-full mx-auto p-8"
          alt="Crib Logo"
          width={345}
          height={300}
          priority
        />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl tracking-tight font-medium font-owners text-zinc-900 dark:text-white">
            Providing quality music services.
          </h2>
          <p className="mb-6 font-light text-zinc-500 md:text-lg dark:text-zinc-300">
            {introP}
          </p>
          <div className="mx-auto flex space-x-4  w-full relative z-20 py-8">
            <GoToMusicButton />
            <Button href={"/services"} text={"Learn More"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHome;
