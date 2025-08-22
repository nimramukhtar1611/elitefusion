import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import homeBg from '../assets/images/homebg.webp';
import mobileBg from '../assets/images/homebg.webp';
import tankImg from '../assets/images/tank.webp';
import textImg from '../assets/images/ht.png';
import smokeImg from '../assets/images/smoke.webp';
import DBL_Arrow from '../assets/images/DBL_Arrow.png';
import smokeSecondImg from '../assets/images/smokeRight.webp';
import About from '../components/About';
import { Video } from '../components/Video';
import Map from '../components/Map';
import Services from '../components/Services';
import Projects from '../components/Projects';
// import Partners from '../components/Partners';
// import News from '../components/News';
import Carear from '../components/Carear';
import Footer from '../components/Footer';
import CardSlider from '../components/CardSlider';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const textElement = document.querySelector('.parallax-text');
      const tankElement = document.querySelector('.parallax-tank');
      const smokeLeftElement = document.querySelector('.parallax-smoke-left');
      const smokeRightElement = document.querySelector('.parallax-smoke-right');
      const bottomSmokeElement = document.querySelector('.parallax-bottom-smoke');
      
      // Move text upward (increased speed)
      if (textElement) {
        textElement.style.transform = `translateY(${-scrollPosition * 0.8}px)`;
      }
      
      // Move tank toward center and upward (increased speed)
      if (tankElement) {
        tankElement.style.transform = `translateX(-50%) translateY(${25 - scrollPosition * 0.4}%) scale(${1 + scrollPosition * 0.001})`;
      }
      
      // Move smoke elements toward center and upward (increased speed)
      if (smokeLeftElement && smokeRightElement) {
        smokeLeftElement.style.transform = `translateX(${scrollPosition * 0.4}px) translateY(${-scrollPosition * 0.4}px)`;
        smokeRightElement.style.transform = `translateX(${-scrollPosition * 0.4}px) translateY(${-scrollPosition * 0.4}px)`;
      }
      
      // Move bottom smoke upward and slightly to the left (increased speed)
      if (bottomSmokeElement) {
        bottomSmokeElement.style.transform = `translateX(${-scrollPosition * 0.2}px) translateY(${-scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* Background Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background images for small devices */}
        <div className="absolute inset-0">
          {/* Desktop Background */}
          <div 
            className="hidden md:block h-full w-full bg-cover bg-center "
            style={{ backgroundImage: `url(${homeBg})` }}
          ></div>
          {/* Mobile Background */}
          <div 
            className="md:hidden h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${mobileBg})` }}
          ></div>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        </div>

        {/* Tank Image */}
        <img
          src={tankImg}
          alt="tank"
          className="parallax-tank absolute z-40 
                    left-1/2 transform -translate-x-1/2 
                    top-[25%] sm:top-[30%] md:top-1/3 md:bottom-[35%] 
                    w-[40vw] max-w-[200px] 
                    md:right-[13%] md:left-auto md:w-[200px] transition-transform duration-100"
        />

        <div className="absolute inset-0 flex items-center justify-center z-30">
        <img
  src={textImg}
  alt="WE MAKE GAMES BETTER TOGETHER"
  className="parallax-text w-full max-w-[300px] md:max-w-[400px] mt-40 md:mt-20 transition-transform duration-100"
/>

        </div>

        {/* Smoke Elements - Hidden on mobile */}
        <div className="hidden md:block">
          <img 
            src={smokeSecondImg} 
            alt="smoke effect" 
            className="parallax-smoke-left absolute top-1/4 left-20 w-[600px] transition-transform duration-100" 
          />
          <img
            src={smokeImg}
            alt="smoke effect"
            className="parallax-smoke-right absolute top-1/4 right-1/4 w-[250px] opacity-40 mix-blend-overlay z-10 transition-transform duration-100"
          />
        </div>

        {/* Bottom Smoke - Hidden on mobile */}
        <div className="hidden md:block">
          <img
            src={smokeSecondImg}
            alt="smoke effect"
            className="absolute bottom-10 left-10 w-[200px] opacity-30 mix-blend-overlay z-10"
          />
          <img
            src={smokeImg}
            alt="smoke effect"
            className="parallax-bottom-smoke absolute bottom-[-5%] right-0 w-[500px] transition-transform duration-100"
          />
        </div>

        {/* Animated Double Arrow */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <img 
            src={DBL_Arrow} 
            alt="Scroll down" 
            className="w-10 h-10" 
            style={{ animationDuration: '1s' }} 
          />
        </div>
      </div>

      <About />
      <Video />
      <Map />
      <Services />
      <CardSlider />
      <Projects />
      {/* <Partners /> */}
      {/* <News /> */}
      <Carear/>
      <Footer />
    </>
  );
};

export default Home;