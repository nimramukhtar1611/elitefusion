import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import servicesBg from "../assets/images/bg-service.webp";
import { Video } from "../components/Video1";
import GameEngines from "../components/GameEngines";
import LeadingDevelopers from "../components/LeadingDevelopers";
import Partners from "../components/Partners";
import MakeBetter from "../components/MakeBetter";
import Footer from "../components/Footer";
import CreativeVision from "../components/CreativeVision";

const OurServices = () => {
  const nextSectionRef = useRef(null);

  const scrollToNext = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <section
        className="relative h-screen flex flex-col justify-center items-center text-center text-white"
        style={{
          backgroundImage: `url(${servicesBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-8xl font-extrabold uppercase font-primary leading-tight">
          CRAFTING <br />
          <span className="text-orange-500">IMMERSIVE WORLDS</span>
        </h1>
        <button
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="absolute bottom-10 animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </section>
      <section ref={nextSectionRef} className="h-screen bg-gray-900">
        <Video />
      </section>
      <CreativeVision />
      <GameEngines />
      <LeadingDevelopers />
      <Partners />
      <MakeBetter />
      <Footer />
    </div>
  );
};

export default OurServices;
