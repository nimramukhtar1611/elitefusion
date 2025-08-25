import React, { useState } from 'react';
import adaptationImage from '../assets/images/armywar.jpg';
import postLaunchImage from '../assets/images/zombiearmy.jpg';
import gameplayImage from '../assets/images/childrenplaying.jpg';
import gameIPImage from '../assets/images/3ideal.jpg';

const tabs = [
  { id: 'adaptation', label: 'TRANSFORMATION', image: adaptationImage },
  { id: 'postLaunch', label: 'EXPANSION', image: postLaunchImage },
  { id: 'gameplay', label: 'INTERACTION', image: gameplayImage },
  { id: 'gameip', label: 'INNOVATION', image: gameIPImage },
];

const detailsData = {
  adaptation: [
    {
      title: 'Remakes and Remasters',
      description: 'Elevating classics with modern design and innovation.',
      expanded: true,
    },
    {
     title: "Cross-Platform Ports",
description: "Deliver games seamlessly across multiple platforms, either at launch or after release.",
      expanded: false,
    },
    {
     title: "Culturalization",
description: "Tailor games to resonate with diverse cultures, languages, and regional values.",
      expanded: false,
    },
  ],
  postLaunch: [
    {
      title: "DLC & Expansions",
description: "Develop fresh content and features to keep players engaged long after launch.",
      expanded: false,
    },
    {
      title: "Live Events",
description: "Create and manage dynamic in-game events that keep players engaged in real time.",
      expanded: false,
    },
  ],
  gameplay: [
    {
     title: "Mechanics Design",
description: "Craft innovative gameplay mechanics that keep players immersed and challenged.",
      expanded: false,
    },
    {
     title: "Level Design",
description: "Build immersive worlds and challenging levels that keep players engaged.",
      expanded: false,
    },
  ],
  gameip: [
    {
      title: "Original IP Creation",
description: "Bring fresh game concepts to life with unique stories, worlds, and mechanics.",
      expanded: false,
    },
    {
      title: "Franchise Management",
description: "Manage, evolve, and expand established game franchises into lasting legacies.",
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
                    ? 'bg-white text-[#B27b2b] shadow-lg'
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
                  <h3 className="text-lg sm:text-xl font-semibold font-secondary">{item.title}</h3>
                  <span className="ml-4 w-7 h-7 flex items-center justify-center rounded-full bg-[#B27b2b] text-white font-bold select-none text-lg">
                    {item.expanded ? '−' : '+'}
                  </span>
                </button>
                {item.expanded && (
                  <p className="mt-3 text-gray-300 leading-relaxed font-secondary text-base sm:text-lg">
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
