import HomeHeader from '@/ui/Headers/HomeHeader'
import AboutHome from '@/ui/Sections/AboutHome'
import ServicesHome from '@/ui/Sections/ServicesHome/ServicesHome'

function page() {
  return (
    <div className='relative '>
    <HomeHeader/>  
    <AboutHome/>
    <ServicesHome/>
    </div>
  )
}

export default page