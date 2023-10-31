import HomeHeader from '@/ui/Headers/HomeHeader'
import AboutHome from '@/ui/Sections/AboutHome'
import ServicesHome from '@/ui/Sections/ServicesHome'
import Footer from 'ui/Navigation/Footer'
export const fetchCache = 'force-cache'
export const dynamic = 'force-static'
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