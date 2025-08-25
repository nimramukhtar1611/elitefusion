import React, { useState, useEffect, useRef } from "react";
import Dev1 from "../assets/images/logo1.png"
import Dev2 from "../assets/images/logo12.png"
import Dev3 from "../assets/Dev/Dev1.webp";
import Dev4 from "../assets/images/logo14.png"
import Dev5 from "../assets/images/logo15.png"
import Dev6 from "../assets/images/logo16.png"
import Dev7 from "../assets/images/logo17.png"
import Dev8 from "../assets/images/logo18.png"

const testimonials = [
  {
    quotation: "“",
    quote: "Elite Fusion delivered excellent quality on time and with unmatched professionalism. Their creative team is a pleasure to collaborate with.",
    name: "HIDEO KOJIMA",
    title: "GAME DESIGNER & DIRECTOR",
    logo: Dev1,
    alt: "konami Productions Logo",
  },
  {
    quotation: "“",
    quote: "As our preferred partner, Elite Fusion consistently provides innovative solutions, helping us achieve our game development goals efficiently.",
    name: "SHIGERU MIYAMOTO",
    title: "GAME DESIGNER",
    logo: Dev2,
    alt: "Nintendo Logo",
  },
  {
    quotation: "“",
    quote: "It has been proven more than once that Elite Fusion reacts quickly, flexibly, and creatively to all our requests. They deliver high-quality results every time.",
    name: "SID MEIER",
    title: "GAME DESIGNER & PROGRAMMER",
    logo: Dev3,
    alt: "2K "
  },
  {
    quotation: "“",
    quote: "Elite Fusion has been reliable in delivering high-quality assets on schedule and maintaining an excellent working relationship. We look forward to future collaborations.",
    name: "GABE NEWELL",
    title: "CO-FOUNDER & CEO",
    logo: Dev4,
    alt: "Valve Logo",
  },
  {
    quotation: "“",
    quote: "Production with Elite Fusion has been seamless. We are excited to continue engaging with them for upcoming projects.",
    name: "JOSEF FARES",
    title: "GAME DESIGNER & DIRECTOR",
    logo: Dev5,
    alt: "Hazelight Studios Logo",
  },
  {
    quotation: "“",
    quote: "Elite Fusion quickly adapted to our schedule and visual style, resulting in a highly successful collaboration for our studio.",
    name: "JENOVA CHEN",
    title: "GAME DESIGNER & DIRECTOR",
    logo: Dev6,
    alt: "Thatgamecompany Logo",
  },
  {
    quotation: "“",
    quote: "The team at Elite Fusion demonstrates transparency, creativity, and a high standard of work. We look forward to an ongoing partnership with this outstanding team.",
    name: "YOKO TARO",
    title: "GAME DESIGNER & DIRECTOR",
    logo: Dev7,
    alt: "PlatinumGames Logo",
  },
  {
    quotation: "“",
    quote: "Elite Fusion consistently delivers top-quality work on time and with exceptional professionalism. Collaborating with them is a true pleasure.",
    name: "SHINJI MIKAMI",
    title: "GAME DESIGNER & DIRECTOR",
    logo: Dev8,
    alt: "Capcom Logo",
  },
];
const LeadingDevelopers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // 5 seconds pause for each content

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#2a2a2b] py-12 px-6 max-w-[90rem] mx-auto overflow-hidden relative " >
      <div className="font-primary">
          <h1 className="text-6xl text-white mb-4 font-primary" style={{ textAlign: "center", fontWeight: "bold" }}>Empowering Developers </h1>
          <h1 className="text-6xl text-white mb-4 font-primary" style={{ textAlign: "center", fontWeight: "bold"  }}>With Trusted Solutions</h1>
        </div>
      <div
        ref={containerRef}
        className="flex items-center space-x-8 py-6 whitespace-nowrap transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 320}px)`,
        }}
      >
        
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#2E424D]  p-6 rounded-lg shadow-md text-white flex-shrink-0 flex flex-col justify-between"
            style={{ width: "500px", height: "450px" }}
          >
            <h1
              className="text-6xl mb-2 leading-none flex justify-center items-center"
              style={{
                paddingTop: "25px",
                border: "2px solid #37370",
                borderRadius: "50%",
                backgroundColor: "#2b2c2c",
                width: "60px",
                height: "60px",
                textAlign: "center",
                lineHeight: "1",
                marginBottom: "0.5rem",
              }}
            >
              {item.quotation}
            </h1>
            <p className="mb-6 text-2xl leading-relaxed font-secondry text-ellipsis max-h-[250px]" style={{ whiteSpace: "normal" }}>{item.quote}</p>
            <div className="flex items-center space-x-4 mt-auto" style={{ paddingBottom: "30px" }}>
              <img src={item.logo} alt={item.alt} className="w-16 h-16 object-contain rounded" />
              <div>
                <p className="font-bold uppercase tracking-wide font-secondry truncate max-w-[200px]">{item.name}</p>
                <p className="text-sm text-gray-300 truncate font-secondry max-w-[200px]">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="mt-8 flex justify-center space-x-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full ${
              idx === currentIndex ? "bg-[#B27b2b]" : "bg-white"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </nav>
    </section>
  );
};

export default LeadingDevelopers;
