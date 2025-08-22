import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import engineeringBg from '../assets/images/engineering.png';
import OurExpertise from '../components/OurExpertise1';
import GameEngines from '../components/GameEngines';
import LeadingDevelopers from '../components/LeadingDevelopers';
import MakeBetter from '../components/MakeBetter';
import OtherServices2 from '../components/OtherServices2';
import CardSlider from '../components/CardSlider';

function Engineering() {
  return (
    <>
      <Navbar />
      <section
        className="relative w-full h-screen bg-center bg-cover flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${engineeringBg})`, fontFamily: '"Antonio", Sans-serif' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/30"></div>
        <div className="relative z-10 max-w-5xl px-4 text-white">
          <h1 className="text-8xl font-extrabold mb-6 tracking-wide font-primary">ENGINEERING</h1>
          <p className="text-2xl max-w-3xl mx-auto font-secondary">
            Harness expertise and an array of cutting-edge tools to address technical development
            challenges and elevate your game
          </p>
        </div>
      </section>
      <OurExpertise />
      <GameEngines />
      <CardSlider />
      <LeadingDevelopers />
      <MakeBetter />
      <OtherServices2 />
      <Footer />
    </>

  );
}

export default Engineering;
