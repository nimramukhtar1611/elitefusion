import React from 'react';
import menuBg from '../assets/images/makeBetter.png';
import { Link } from 'react-router-dom';

const MakeBetter = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${menuBg})` }}
    >
      <div className="bg-black bg-opacity-60">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-widest mb-4 font-secondary">
            READY TO IGNITE YOUR VISION?
          </p>
          <h2 className="text-6xl font-bold mb-10 font-primary">
            LET’S MAKE GAMES BETTER,{' '}
            <span className="text-orange-500">TOGETHER.</span>
          </h2>
       <Link to='/contact-us'>   <button className="relative inline-flex items-center px-6 py-3 text-sm font-medium text-white group w-40 justify-center bg-transparent border-0">
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 origin-top-left"></span>
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-500 transition-transform duration-300 group-hover:translate-y-2 origin-bottom-right font-secondary"></span>
            CONTACT US
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MakeBetter;
