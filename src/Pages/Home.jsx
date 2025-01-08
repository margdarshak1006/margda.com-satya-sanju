import React from 'react'
import Navbar from '../Components/Home/navbar'
import HeroSection from '../Components/Home/HeroSection'

import Footer from '../Components/Home/Footer'
import ServicesTable from '../Components/Home/ServiceTable'
import ServicesSection from '../Components/Home/ServicesSection'
import TestimonialsSection from '../Components/Home/TestimonialsSection'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <ServicesTable/>
      <ServicesSection/>
      <TestimonialsSection/>
      
      <Footer/>
      
    </div>
  )
}

export default Home
