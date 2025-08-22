import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import engineeringBg from '../assets/images/engineering.png'; 
import artProductionBg from '../assets/images/art-production.png'; 

const OtherServices1 = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative bg-gray-900 text-gray-400 py-20" style={{ fontFamily: '"Antonio", Sans-serif' }}>
      <h3 className="text-center  uppercase mb-12  text-white font-primary text-6xl">
        OTHER SERVICES
      </h3>
      <div className="max-w-6xl mx-auto flex justify-center items-center px-9 space-x-20 relative ">
        <Link
          to="/engineering"
          onMouseEnter={() => setHovered('engineering')}
          onMouseLeave={() => setHovered(null)}
          className="relative text-3xl font-bold uppercase cursor-pointer z-10 flex items-center justify-center font-secondary"
          style={{ width: '1000px', height: '200px' }}
        >
          ENGINEERING
          {hovered === 'engineering' && (
            <div
              className="absolute inset-0 bg-center opacity-30 -z-10"
              style={{ backgroundImage: `url(${engineeringBg})`, backgroundSize: 'cover', borderRadius: '5%' }}
            />
          )}
        </Link>
        <div className="w-px h-20 bg-gray-600"></div>
        <Link
          to="/artproduction"
          onMouseEnter={() => setHovered('artproduction')}
          onMouseLeave={() => setHovered(null)}
          className="relative text-3xl font-bold uppercase cursor-pointer z-10 flex items-center justify-center font-secondary"
          style={{ width: '1000px', height: '200px' }}
        >
          ART PRODUCTION
          {hovered === 'artproduction' && (
            <div
              className="absolute inset-0 bg-center opacity-30 -z-10"
              style={{ backgroundImage: `url(${artProductionBg})`, backgroundSize: 'cover',borderRadius: '5%' }}
            />
          )}
        </Link>
      </div>
    </section>
  );
};

export default OtherServices1;
