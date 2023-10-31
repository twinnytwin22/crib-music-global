import Image from 'next/image';
import Button from 'ui/Buttons/Button/Button';
import GoToMusicButton from 'ui/Buttons/GoToMusicButton';
import { services } from './lib';
function ServiceSection({ icon, title, shortDescription }) {
  return (
    <div>
      <div className='flex items-center -ml-4'>
        <div className="flex justify-center items-center mb-2 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-medium font-owners dark:text-white">{title}</h3>

      </div>
      <p className="text-zinc-500 dark:text-zinc-300 font-light">{shortDescription}</p>
    </div>
  );
}

function ServicesHome() {


  return (
    <section className="bg-zinc-100 dark:bg-zinc-950 w-full ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className='md:flex justify-between items-start md:space-x-8'>
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-medium font-owners text-zinc-900 dark:text-white">
            Let's craft something extraordinary, together.
            </h2>
            <p className="text-zinc-500 sm:text-xl dark:text-zinc-300 font-light">
            We offer music licensing, administration, and supervision services, connecting both musicians and content creators to global success. .</p>
          </div>
          <div className='w-full h-40 '>
            <Image
              className='object-cover w-full h-32 rounded-xl grayscale hover:grayscale-0 duration-300 ease-in-out'
              width={450}
              height={60}
              src={'/site_images/studio.jpg'}
              alt='studio' />
          </div>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {services.map((service, index) => (
            <ServiceSection key={index} {...service} />
          ))}
        </div>
        <div className='mx-auto flex space-x-4 justify-center w-full relative z-20 py-8'>
          <GoToMusicButton />
          <Button href={'/services'} text={'Learn More'}/>
        </div>
      </div>
    </section>
  );
}

export default ServicesHome;
