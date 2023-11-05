import HomeHeader from '@/ui/Headers/HomeHeader'
import AboutHome from '@/ui/Sections/AboutHome'
import ServicesHome from '@/ui/Sections/ServicesHome'
import Footer from 'ui/Navigation/Footer'
import FAQ from 'ui/Sections/FAQ/FAQ'
export const fetchCache = 'force-cache'
export const dynamic = 'force-static'



async function page() {
  return (
    <div className='relative h-screen'>
    <HomeHeader/>  
    <AboutHome/>
    
    <ServicesHome/>
    <div id='faq' className='max-w-5xl mx-auto'>
    <FAQ/>
    </div>
    <Footer/>

    <div className='p-8'/>
    </div>
  )
}

export default page