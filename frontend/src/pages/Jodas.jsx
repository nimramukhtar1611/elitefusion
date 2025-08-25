
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import mobileBg from '../assets/images/eagle.jpg';
import judasBg from '../assets/images/judas1.jpg';
import judasWar from '../assets/images/judaswar.jpg';
import judasmen from '../assets/images/judasmen.jpg';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import OurWork from './OurWork'
const Jodas = () => {
  return (
    <>      
      {/* Background */}
      <div 
        className="relative flex flex-col justify-start text-white min-h-screen bg-cover bg-center w-full overflow-x-hidden"
        style={{ backgroundImage: `url(${mobileBg})` }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 h-full bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

        {/* ← Arrow Button (navigate to OurWork page) */}
        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/our-work" 
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition shadow-lg flex items-center gap-2"
          >
            <FaArrowLeft className="text-white text-xl" />
            <span className="hidden md:inline text-white font-medium font-secondary">Go Back</span>
          </Link>
        </div>
        
        {/* First section */}
        <div className="relative z-10 mt-20 px-4 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-10">
          <img 
            src={judasBg} 
            alt="Judas" 
            className="w-full max-w-full md:w-1/3 mt-3 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          <motion.div 
            className="md:w-2/3 text-left space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide font-primary">JUDAS</h1>
            <p className="text-base md:text-lg text-gray-300 font-secondary leading-relaxed">
              Judas is an intense strategy game where betrayal and trust play a key role. 
              Navigate alliances, deception, and strategic decisions in an immersive world 
              filled with challenges and gripping storylines.
            </p>
          </motion.div>
        </div>

        {/* Second section */}
        <div className="relative z-10 mt-24 px-4 md:px-8 flex flex-col md:flex-row-reverse items-center gap-10">
          <img 
            src={judasWar} 
            alt="Judas War" 
            className="w-full max-w-full md:w-1/3 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          <motion.div 
            className="md:w-2/3 text-left space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-primary">DEVELOPMENT INSIGHTS</h1>
            <p className="text-base md:text-lg text-gray-300 font-secondary leading-relaxed">
              Our team designed intricate levels, balanced strategy mechanics, 
              and built immersive graphics to deliver a gameplay experience where 
              trust and betrayal define every move. 
            </p>
          </motion.div>
        </div>

        {/* Third section */}
        <div className="relative z-10 mt-24 px-4 md:px-8 flex flex-col md:flex-row items-center gap-10">
          <img 
            src={judasmen} 
            alt="Judas Men" 
            className="w-full max-w-full md:w-1/3 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          <motion.div 
            className="md:w-2/3 text-left space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-primary">GAME CONCEPT</h1>
            <p className="text-base md:text-lg text-gray-300 font-secondary leading-relaxed">
              Judas challenges players to build alliances, manage resources, 
              and outwit rivals. Every choice impacts the story, making each 
              playthrough unique and deeply engaging.
            </p>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="relative mt-20 w-full bg-gradient-to-r from-gray-900/70 to-black/70 py-6 flex flex-col md:flex-row justify-around text-center font-semibold text-sm md:text-base backdrop-blur-md rounded-t-2xl">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 uppercase font-secondary text-xs">Platform</p> 
            <p className="text-white font-secondary">PC / Console</p>           
          </div>
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 font-secondary uppercase text-xs">Client</p>
            <p className="text-white font-secondary">Ghost Story Games</p>
          </div>
          <div>
            <p className="text-gray-400 font-secondary uppercase text-xs">Service</p>
            <p className="text-white font-secondary">Game Development</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jodas;



