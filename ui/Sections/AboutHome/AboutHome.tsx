import Image from 'next/image'
import ContactButton from 'ui/Buttons/ContactButton'
import GoToMusicButton from 'ui/Buttons/GoToMusicButton'

function AboutHome() {
    const image = '/site_images/globe-big_logo.svg'
    const imageLight = '/site_images/globe-big_logo-black.svg'
    return (
        <section className="bg-white dark:bg-black">
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
                    <h2 className="mb-4 text-4xl tracking-tight font-medium font-owners text-zinc-900 dark:text-white">Let's create more tools and ideas that brings us together.</h2>
                    <p className="mb-6 font-light text-zinc-500 md:text-lg dark:text-zinc-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                    <div className='mx-auto flex space-x-4  w-full relative z-20 py-8'>
                    <GoToMusicButton/>
                    <ContactButton />
                </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHome