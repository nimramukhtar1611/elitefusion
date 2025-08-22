import React, { useState } from 'react';
import adaptationImage from '../assets/images/neir-automata.jpg';
import postLaunchImage from '../assets/images/p27.png';
import gameplayImage from '../assets/images/p17.png';
import gameIPImage from '../assets/images/p28.png';

const tabs = [
  { id: 'adaptation', label: 'ADAPTATION', image: adaptationImage },
  { id: 'postLaunch', label: 'POST-LAUNCH CONTENT', image: postLaunchImage },
  { id: 'gameplay', label: 'GAMEPLAY & DESIGN', image: gameplayImage },
  { id: 'gameip', label: 'GAME & IP DEVELOPMENT', image: gameIPImage },
];

const detailsData = {
  adaptation: [
    {
      title: 'Remakes and Remasters',
      description: 'Modernize existing games from quality-of-life upgrades to redesigning gameplay.',
      expanded: true,
    },
    {
      title: 'Simultaneous/Post-Launch Ports',
      description: 'Port games to multiple platforms simultaneously or post-launch.',
      expanded: false,
    },
    {
      title: 'Culturalization',
      description: 'Adapt games to different cultures and regions.',
      expanded: false,
    },
  ],
  postLaunch: [
    {
      title: 'DLC and Expansions',
      description: 'Create additional content to extend game life.',
      expanded: false,
    },
    {
      title: 'Live Events',
      description: 'Design and manage in-game live events.',
      expanded: false,
    },
  ],
  gameplay: [
    {
      title: 'Mechanics Design',
      description: 'Develop engaging gameplay mechanics.',
      expanded: false,
    },
    {
      title: 'Level Design',
      description: 'Create immersive and challenging levels.',
      expanded: false,
    },
  ],
  gameip: [
    {
      title: 'Original IP Creation',
      description: 'Develop new game concepts and intellectual properties.',
      expanded: false,
    },
    {
      title: 'Franchise Management',
      description: 'Manage and expand existing game franchises.',
      expanded: false,
    },
  ],
};

export default function OurExpertise() {
  const [activeTab, setActiveTab] = useState('adaptation');
  const [details, setDetails] = useState(detailsData);

  const toggleDetail = (tabId, index) => {
    setDetails((prevDetails) => {
      const updated = { ...prevDetails };
      updated[tabId] = updated[tabId].map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      );
      return updated;
    });
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="bg-gray-900 text-white py-16 px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto font-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-7xl font-bold mb-12 text-center uppercase font-primary">
          Our Expertise
        </h2>

        {/* Tabs Navigation */}
        <nav className="flex overflow-x-auto pb-2 mb-10 scrollbar-hide">
          <div className="flex space-x-1 sm:space-x-4 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg font-secondary transition-all duration-300 whitespace-nowrap text-sm sm:text-base font-medium ${
                  activeTab === tab.id
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Image section */}
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-xl shadow-2xl">
            <div
              className="h-64 sm:h-80 md:h-96 w-full bg-cover bg-center transition-all duration-500 transform group-hover:scale-105"
              style={{ backgroundImage: `url(${activeTabData.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-primary">
                  {activeTabData.label}
                </h3>
              </div>
            </div>
          </div>

          {/* Accordion Description section */}
          <div className="w-full lg:w-1/2 space-y-6">
            {details[activeTab].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-4 sm:p-5 rounded-xl border border-gray-700 backdrop-blur-sm shadow-md hover:bg-gray-700/50 transition"
              >
                <button
                  onClick={() => toggleDetail(activeTab, index)}
                  className="flex justify-between items-center w-full text-left"
                  aria-expanded={item.expanded}
                >
                  <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                  <span className="ml-4 w-7 h-7 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold select-none text-lg">
                    {item.expanded ? '−' : '+'}
                  </span>
                </button>
                {item.expanded && (
                  <p className="mt-3 text-gray-300 leading-relaxed text-base sm:text-lg">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
