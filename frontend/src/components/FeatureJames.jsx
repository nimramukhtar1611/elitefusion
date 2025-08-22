import React from 'react';
import { GiPistolGun, GiSpaceSuit } from 'react-icons/gi';
import { FaGamepad, FaPlus, FaUsers, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedJams = () => {
  const jams = [
    {
      id: 1,
      title: "BATTLE ROYALE JAM",
      icon: <GiPistolGun className="text-4xl text-red-500" />,
      description: "Last developer standing wins! Create the ultimate survival shooter.",
      participants: "2,400+ warriors",
      deadline: "REGISTRATION OPEN",
      theme: "Last Man Standing",
      highlight: "Prize Pool: $5,000"
    },
    {
      id: 2,
      title: "RETRO REVIVAL JAM",
      icon: <FaGamepad className="text-4xl text-orange-400" />,
      description: "Bring back the 8-bit magic with modern twists. Pixel art required!",
      participants: "1,800+ creators",
      deadline: "ONGOING",
      theme: "90s Nostalgia",
      highlight: "Featured on Steam"
    },
    {
      id: 3,
      title: "COSMIC HORROR JAM",
      icon: <GiSpaceSuit className="text-4xl text-purple-400" />,
      description: "Lovecraft meets game dev. Make players question their sanity.",
      participants: "1,200+ cultists",
      deadline: "NEW ROUND STARTING",
      theme: "Eldritch Nightmares",
      highlight: "Voice acting prize"
    }
  ];

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-700 pb-6">
          <div>
            <h2 className="text-5xl font-bold font-primary mb-2 text-white">EPIC GAME JAMS</h2>
            <p className="text-gray-400">Join thousands of developers in these intense challenges</p>
          </div>
          <Link to="/host-jam">
            <button className="mt-6 md:mt-0 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg group">
              <FaPlus className="mr-2 group-hover:rotate-90 transition-transform" />
              HOST A JAM
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jams.map((jam) => (
            <div
              key={jam.id}
              className="rounded-xl p-6 transition-all duration-300 border border-gray-700 bg-[#111] hover:shadow-lg hover:border-orange-500 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black rounded-lg border border-gray-600">{jam.icon}</div>
                <span className="text-xs font-bold px-2 py-1 bg-red-600/20 text-red-400 rounded">LIVE</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{jam.title}</h3>
              <p className="text-gray-300 mb-4">{jam.description}</p>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center text-sm">
                  <span className="text-gray-400 mr-2">THEME:</span>
                  <span className="text-orange-400">{jam.theme}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FaUsers className="mr-2 text-gray-400" />
                  <span className="text-gray-300">{jam.participants}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FaFire className="mr-2 text-orange-400" />
                  <span className="text-orange-300 font-semibold">{jam.highlight}</span>
                </div>
              </div>

              <Link to={`/join/${jam.id}`}>
                <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-orange-400 flex items-center justify-center group">
                  <span className="group-hover:text-black transition-colors">JOIN BATTLE</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJams;