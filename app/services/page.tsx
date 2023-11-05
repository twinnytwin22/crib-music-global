import ContactButton from "@/ui/Buttons/ContactButton/ContactButton";
import Image from "next/image";
import Footer from "ui/Navigation/Footer/Footer";
import FAQ from "ui/Sections/FAQ";

export const dynamic = "force-static";

async function page() {
  //HEADINGS
  const techSupportH = `We got you covered. `;
  const musicLicenseH = `Music Licensing`;
  const musicPubH = `Music Publishing`;
  const musicAdminH = `Music Administration`;

  const musicSupH = `Music Supervision`;

  // SUBHEADINGS
  const techSupportSub = `Discover Our Comprehensive Services`;
  const musicSupSub = `Elevate Your Music in Every Frame`;
  const musicAdminSub = `Hassle-Free Administrative Support`;
  const musicPubSub = `Maximize Your Music's Earning Potential`;
  const musicLicenseSub = `Licensing Expertise at Your Fingertips`;
  const musicMasteringSub = `Elevate Your Sound to Perfection`
  // PARAGRAPHS
  const techSupportP = `At CRIB, we are dedicated to empowering businesses for success. Unlock your full potential with our transformative multichannel services and innovative technology. Enhance customer experiences, drive revenue growth, and achieve sustainable success with our seamless solutions.`;

  const musicSupP = `Enhance the impact of your music in the visual and digital realms with our supervision services. Our team is skilled in synchronizing music with visuals to create captivating and memorable experiences. We work closely with filmmakers, advertising agencies, and content creators to ensure that your music complements their projects perfectly, amplifying the emotional resonance and engagement of their content. Join Crib Music Global and let your music tell a story that transcends boundaries.`;

  const musicAdminP = `Navigating the administrative aspects of the music industry can be daunting. That's where Crib Music Global comes in. We offer meticulous and efficient administration services, handling tasks such as copyright registration, royalty collection, and contractual negotiations. Let us take care of the paperwork while you focus on creating remarkable music.  `;

  const musicPubP = `We believe in the power of your music to inspire, connect, and resonate with audiences worldwide. Our Music Publishing services are designed to unlock the full potential of your compositions. We're here to help you navigate the intricate world of music rights, ensuring that your work is not only protected but also poised for success. With our expertise, we'll explore avenues for your music's licensing, distribution, and performance, so you can focus on creating, knowing that your music is working for you.`;

  const musicLicenseP = `Unlock new horizons for your music with our comprehensive music licensing services. Whether you're a budding artist or an established musician, we have the expertise and connections to get your work featured in film, television, commercials, and more. Our dedicated team will guide you through the intricate world of licensing, securing opportunities that align perfectly with your artistic vision.`;

  const whyUs = `Why Choose Us
  At CRIB, we are committed to excellence in every aspect of web design. Here's why you should choose us:
  Experience: With years of industry experience, we've honed our skills to perfection.
  Dedicated Team: Our passionate team of designers, developers, and support staff are always ready to assist you.
  Client-Centric Approach: Your success is our priority. We listen to your needs and tailor solutions accordingly.
  Cutting-Edge Technology: We stay ahead of the curve with the latest design trends and technologies.
  Results-Driven: Our focus is on delivering websites and applications that drive real results for your business.`;

  //IMAGES
  const introImage = '/artist_images/5c91a939-169f-4e18-827c-2b5ab83e7178-kingcashbeatz.jpg';
  const musicLicenseImage = '/artist_images/IMG_1415.jpg';
  const musicPubImage = '/artist_images/jaii-reynolds.png';
  const musicAdminImage ='/site_images/afro-artist.png';
  const musicSupImage = '/site_images/music-sup.png';

  return (
    <div className="w-full overflow-y-scroll relative h-screen py-20">
      <section className="bg-zinc-100 dark:bg-zinc-950 w-full border-b flex items-center border-zinc-300 dark:border-zinc-800 h-[85vh] ">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8  lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white font-owners">
              {techSupportH}{" "}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {techSupportSub}
            </p>
            <p className="font-light text-zinc-500 sm:text-lg dark:text-zinc-300 mb-4">
              {techSupportP}
            </p>
            <ContactButton />
          </div>
          <div className="mx-auto object-cover max-w-lg w-full relative order-first lg:order-last col-span-5">
            <Image
              width={400}
              height={325}
              src={introImage}
              alt="mockup"
              className="mt-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800 py-16">
        <div className="gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light  text-zinc-500 sm:text-lg dark:text-zinc-300 order-last lg:order-first">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {musicLicenseH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {musicLicenseSub}
            </p>

            <p className="mb-4">{musicLicenseP}</p>
            <ContactButton />
          </div>
          <div className="mx-auto object-cover max-w-lg w-full relative order-first lg:order-last">
            <Image
              width={400}
              height={325}
              src={musicLicenseImage}
              alt="mockup"
              className="mt-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
        </div>
      </section>
      <section className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800 py-16">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="object-cover max-w-lg w-full relative mx-auto">
            <Image
              width={400}
              height={325}
              src={musicPubImage}
              alt="mockup"
              className="my-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
          <div className="font-light text-zinc-500 sm:text-lg dark:text-zinc-300">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {musicPubH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {musicPubSub}
            </p>

            <p className="mb-4">{musicPubP}</p>
            <ContactButton />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800 py-16">
        <div className="gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light  text-zinc-500 sm:text-lg dark:text-zinc-300 order-last lg:order-first">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {musicAdminH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {musicAdminSub}
            </p>

            <p className="mb-4">{musicAdminP}</p>
            <ContactButton />
          </div>
          <div className="mx-auto object-cover max-w-lg w-full relative order-first lg:order-last">
            <Image
              width={400}
              height={325}
              src={musicAdminImage}
              alt="mockup"
              className="mt-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
        </div>
      </section>
      <section
        id="about"
        className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800 py-16"
      >
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="object-cover max-w-lg w-full relative mx-auto">
            <Image
              width={400}
              height={325}
              src={musicSupImage}
              alt="mockup"
              className="my-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
          <div className="font-light text-zinc-500 sm:text-lg dark:text-zinc-300">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {musicSupH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {musicSupSub}
            </p>

            <p className="mb-4">{musicSupP}</p>
            <ContactButton />
          </div>
        </div>
      </section>
      <section id='faq' className='max-w-5xl mx-auto'>
    <FAQ/>
    </section>
      <Footer/>
    </div>
  );
}

export default page;
