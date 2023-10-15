import HomeHeader from '@/ui/Headers/HomeHeader'
import AboutHome from '@/ui/Sections/AboutHome'
import ServicesHome from '@/ui/Sections/ServicesHome/ServicesHome'
import React from 'react'

function page() {
  return (
    <div>
    <HomeHeader/>  
    <AboutHome/>
    <ServicesHome/>
    </div>
  )
}

export default page