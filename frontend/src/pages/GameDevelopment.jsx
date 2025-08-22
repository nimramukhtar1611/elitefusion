import Navbar from '../components/Navbar';
import OurExpertise from '../components/OurExpertise';
import GameEngines from '../components/GameEngines';
import Footer from '../components/Footer';
import LeadingDevelopers from '../components/LeadingDevelopers';
import MakeBetter from '../components/MakeBetter';
import servicesBg from '../assets/images/game-development.png';
import OtherServices1 from '../components/OtherServices1';
import CardSlider from '../components/CardSlider';

export default function GameDevelopment() {
  return (
    <>
      <Navbar />
      <section
        className="relative w-full h-screen bg-center bg-cover flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${servicesBg})`, fontFamily: '"Antonio", Sans-serif' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/30"></div>
        <div className="relative z-10 max-w-5xl px-4 text-white">
          <h1 className="text-8xl font-extrabold mb-6 tracking-wide font-primary">GAME DEVELOPMENT</h1>
          <p className="text-xl max-w-3xl mx-auto font-secondary">
            Unlock expertise for any stage of game development, from level and encounter design,
            to full remakes and development, from the ground up.
          </p>
        </div>
      </section>
      <OurExpertise />
       <GameEngines />
        <CardSlider />
       <LeadingDevelopers />
       <MakeBetter />
       <OtherServices1 />
       <Footer />
    </>
  );
}
