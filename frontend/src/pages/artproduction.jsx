import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import artProductionBg from '../assets/images/art-production.png';
import OurExpertise2 from '../components/OurExpertise2';
import GameEngines from '../components/GameEngines';
import LeadingDevelopers from '../components/LeadingDevelopers';
import MakeBetter from '../components/MakeBetter';
import OtherServices3 from '../components/OtherServices3';
import CardSlider from '../components/CardSlider';

const ArtProduction = () => {
  return (
    <>
      <Navbar />
      <section
        className="relative w-full h-screen bg-center bg-cover flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${artProductionBg})`, fontFamily: '"Antonio", Sans-serif' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/30"></div>
        <div className="relative z-10 max-w-5xl px-4 text-white">
          <h1 className="text-8xl font-extrabold mb-6 font-primary ">ART PRODUCTION</h1>
          <p className="text-2xl max-w-4xl mx-auto font-secondary">
            Leverage a global network of talented artists to bring your vision to life across the entire 
            production pipeline — from ideation to in-engine integration.
          </p>
        </div>
      </section>
      <OurExpertise2 />
      <GameEngines />
      <CardSlider />
      <LeadingDevelopers />
      <MakeBetter />
      <OtherServices3 />
      <Footer />
    </>
  );
};

export default ArtProduction;
