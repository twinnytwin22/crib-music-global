import Providers from '@/lib/providers/Providers'
import Navbar from '@/ui/Navigation/Navbar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import LicenseModal from 'ui/Components/LicenseModal/LicenseModal'
import FooterPlayer from 'ui/Components/Players/FooterPlayer'
import './globals.css'

export const metadata = {
  title: 'CRIB Music Global',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
