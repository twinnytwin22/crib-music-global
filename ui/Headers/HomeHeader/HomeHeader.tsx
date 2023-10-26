'use client'
import ContactButton from '@/ui/Buttons/ContactButton/ContactButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GoToMusicButton from 'ui/Buttons/GoToMusicButton/GoToMusicButton';

function HomeHeader() {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        if(typeof window !== 'undefined'){
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }}, []);
    const image = '/site_images/globe-big_logo.svg'
    const imageLight = '/site_images/globe-big_logo-black.svg'
    const bgImage = '/site_images/globe-dot-bg.svg'
    return (
        <section className='min-h-[600px] h-full bg-white dark:bg-black flex items center overflow-hidden border-b border-zinc-200 dark:border-zinc-800 relative'>
            <Image
                priority
                src={bgImage}
                alt="Background"
                fill
                quality={75}
                className='-z-0 grayscale contrast-125 brightness-125 object-cover opacity-20 dark:opacity-30'
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />

            <div>
            <div className='h-32 p-8'>
                <Image
                    src={imageLight}
                    className=" block dark:hidden w-full h-full mx-auto"
                    alt="Crib Logo"
                    width={345}
                    height={300}
                    priority
                />
                <Image
                    src={image}
                    className=" hidden dark:block w-full h-full mx-auto"
                    alt="Crib Logo"
                    width={345}
                    height={300}
                    priority
                />
                </div>
                <h1 className='relative text-4xl md:text-5xl lg:text-7xl font-medium font-owners text-center tracking-wider '>Your<span className='text-transparent bg-clip-text bg-gradient-to-r to-red-400 from-red-200'> Global Music</span> Partner.</h1>
                <p className=' px-4 max-w-2xl mx-auto text-center justify-center py-8'>Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                
                <div className='mx-auto flex space-x-4 justify-center w-full relative z-20 py-8'>
                    <GoToMusicButton/>
                    <ContactButton />
                </div>
            </div>
        </section>
    )
}

export default HomeHeader