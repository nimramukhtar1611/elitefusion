import React, { useState } from 'react';
import engineEnhancement from '../assets/images/p29.png';
import toolDevelopment from '../assets/images/p25.png';
import renderingUpgrades from '../assets/images/p31.png';
import performanceOptimization from '../assets/images/p32.png';

const tabs = [
  { 
    id: 'engineEnhancement', 
    label: 'Engine Enhancement', 
    image: engineEnhancement, 
    description: 'Improve engine quality by modernizing engines, implementing cutting-edge features, and resolving bugs to ensure your game stays competitive in the market.' 
  },
  { 
    id: 'toolDevelopment', 
    label: 'Tool Development', 
    image: toolDevelopment, 
    description: 'Extend game life with DLC, expansions, and live events. We create powerful tools that empower your team to deliver continuous content updates.' 
  },
  { 
    id: 'renderingUpgrades', 
    label: 'Rendering Upgrades', 
    image: renderingUpgrades, 
    description: 'Create engaging mechanics and immersive level designs with our advanced rendering solutions that push visual boundaries while maintaining performance.' 
  },
  { 
    id: 'performanceOptimization', 
    label: 'Performance Optimization', 
    image: performanceOptimization, 
    description: 'Develop new IPs and manage existing game franchises with our optimization expertise that ensures smooth gameplay across all target platforms.' 
  },
];

export default function OurExpertise1() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
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
          {/* Image with overlay */}
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

          {/* Description */}
          <div className="w-full lg:w-1/2 flex items-center">
            <div className="p-4 sm:p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                {activeTabData.description}
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}