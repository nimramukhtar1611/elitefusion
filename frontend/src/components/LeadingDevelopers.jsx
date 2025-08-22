import React, { useState, useEffect, useRef } from "react";
import Dev1 from "../assets/Dev/Dev1.webp";
import Dev2 from "../assets/Dev/Dev2.webp";
import Dev3 from "../assets/Dev/Dev3.webp";
import Dev4 from "../assets/Dev/Dev4.webp";
import Dev5 from "../assets/Dev/Dev5.webp";
import Dev6 from "../assets/Dev/Dev6.webp";
import Dev7 from "../assets/Dev/Dev7.webp";
import Dev8 from "../assets/Dev/Dev8.webp";

const testimonials = [
  {
    quotation: "“" ,
    quote: "Virtuos delivered excellent quality on time and at competitive rate. They are a pleasure to work with.",
    name: "CrysDale Matthew",
    title: "Art Director",
    logo: Dev1,
    alt: "2K Logo",
  },
  {
    quotation: "“" ,
    quote: "As our preferred vendor, Virtuos is a strong partner which we can rely on to help us in our game development.",
    name: "Jean-Marc Pereira",
    title: "Outsourcing Manager",
    logo: Dev2,
    alt: "Eidos Montreal Logo",
  },
  {
    quotation: "“" ,
    quote: "It has been proven more than once, that Virtuos is able to react quickly, flexibly and innovatively on all our requests. Thanks for providing high quality on all levels.",
    name: "JULIA SCHNEIDER ",
    title: "HEAD OF ART ",
    logo: Dev3,
    alt: "2K Logo",
  },
  {
    quotation: "“" ,
    quote: "Virtuos has been solid in their delivery of high quality assets in a timely manner as well as a great working relationship for several years. I hope to continue our working relationship on future projects. ",
    name: "YAYOI MARUNO ",
    title: "DEVELOPMENT DIRECTOR",
    logo: Dev4,
    alt: "Eidos Montreal Logo",
  },
  {
    quotation: "“" ,
    quote: "It has been a smooth production with Virtuos and we will be glad to engage again for our next production. ",
    name: "TUUKKA TAIPALVESI ",
    title: "EXECUTIVE PRODUCER ",
    logo: Dev5,
    alt: "2K Logo",
  },
  {
    quotation: "“" ,
    quote: "Virtuos quickly ramped up to our schedule and artistic visual style, which resulted in a highly successful collaboration for our studio. ",
    name: "STEPHEN ROYER ",
    title: "ART DIRECTOR",
    logo: Dev6,
    alt: "Eidos Montreal Logo",
  },
  {
    quotation: "“" ,
    quote: "The team at Virtuos has been a team of great collaborators who are always transparent with their process and progress, always striving for and meeting a high bar. I look forward to our continued partnership with this great team of developers.",
    name: "JORGE OSEGUERA",
    title: "SENIOR PRODUCER ",
    logo: Dev7,
    alt: "2K Logo",
  },
  {
    quotation: "“" ,
    quote: "Virtuos delivered excellent quality on time and at competitive rate. They are a pleasure to work with. ",
    name: "CRYSDALE MATTHEW ",
    title: "ART DIRECTOR",
    logo: Dev8,
    alt: "Eidos Montreal Logo",
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
    <section className="bg-[#2a2a2b] py-12 px-6 max-w-[90rem] mx-auto overflow-hidden relative" style={{ fontFamily: '"Antonio", Sans-serif' }}>
      <div className="font-primary">
          <h1 className="text-6xl text-white mb-4" style={{ textAlign: "center", fontWeight: "bold" }}>LEADING DEVELOPERS</h1>
          <h1 className="text-6xl text-white mb-4" style={{ textAlign: "center", fontWeight: "bold"  }}>TRUST US TO DELIVER</h1>
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
            className="bg-[#2E424D] p-6 rounded-lg shadow-md text-white flex-shrink-0 flex flex-col justify-between"
            style={{ width: "500px", height: "450px" }}
          >
            <h1
              className="text-6xl mb-2 leading-none flex justify-center items-center"
              style={{
                paddingTop: "25px",
                border: "2px solid #37370",
                borderRadius: "50%",
                backgroundColor: "#004459",
                width: "60px",
                height: "60px",
                textAlign: "center",
                lineHeight: "1",
                marginBottom: "0.5rem",
              }}
            >
              {item.quotation}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-ellipsis max-h-[200px]" style={{ whiteSpace: "normal" }}>{item.quote}</p>
            <div className="flex items-center space-x-4 mt-auto" style={{ paddingBottom: "30px" }}>
              <img src={item.logo} alt={item.alt} className="w-16 h-16 object-contain rounded" />
              <div>
                <p className="font-bold uppercase tracking-wide truncate max-w-[200px]">{item.name}</p>
                <p className="text-sm text-gray-300 truncate max-w-[200px]">{item.title}</p>
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
              idx === currentIndex ? "bg-[#DC7D28]" : "bg-white"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </nav>
    </section>
  );
};

export default LeadingDevelopers;
