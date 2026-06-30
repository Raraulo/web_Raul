import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import WhyHireMe from '../components/WhyHireMe';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Experience />
      <WhyHireMe />
      <Contact />
    </>
  );
};

export default Home;
