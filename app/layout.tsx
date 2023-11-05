import Providers from '@/lib/providers/Providers';
import allKeywords from "@/lib/site/seoKeywords";
import Navbar from '@/ui/Navigation/Navbar';
import Script from 'next/script';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LicenseModal from 'ui/Components/LicenseModal/LicenseModal';
import FooterPlayer from 'ui/Components/Players/FooterPlayer';
import './globals.css';

const metaImage = 'https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/object/public/site_images/CribArtboard%201%20copy@4x.png'
export const metadata = {
  openGraph: {
    title: "CRIB Music Global",
    description: "Your Global Music Partner.",
    url: "https://cribmusic.xyz",
    siteName: "CRIB Music",
    keywords: allKeywords,

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
//  type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
          {process.env.NODE_ENV !== 'development' && <Script
        
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.us-east.tinybird.co"
        data-token={process.env.NEXT_PUBLIC_TINYBIRD_TRACKER_TOKEN}
      ></Script>}
      <body className=' bg-white dark:bg-black overflow-hidden'>
        <Providers>
          <Navbar />
          <div className='relative min-h-full overflow-y-auto'>
            <LicenseModal/>
            {children}
            <ToastContainer theme="dark" />

          </div>
          <div className='relative'>
          <FooterPlayer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
