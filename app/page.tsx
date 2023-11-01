import HomeHeader from '@/ui/Headers/HomeHeader'
import AboutHome from '@/ui/Sections/AboutHome'
import ServicesHome from '@/ui/Sections/ServicesHome'
import { Metadata } from 'next'
import Footer from 'ui/Navigation/Footer'
export const fetchCache = 'force-cache'
export const dynamic = 'force-static'

const metaImage = 'https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/object/public/site_images/crib-logo-big.png'
export const metadata: Metadata = {
  openGraph: {
    title: "CRIB Music Global",
    description: "Your Global Music Partner.",
    url: "https://cribmusic.xyz",
    siteName: "CRIB Music",
    images: [
      {
        url: metaImage,
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        width: 1800,
        height: 1600,
        alt: "Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

async function page() {
  return (
    <div className='relative h-screen'>
    <HomeHeader/>  
    <AboutHome/>
    <ServicesHome/>
    <Footer/>
    <div className='p-8'/>
    </div>
  )
}

export default page