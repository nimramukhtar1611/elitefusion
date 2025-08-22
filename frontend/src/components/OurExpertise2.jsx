import { useState } from 'react';
import standAloneArtImage from '../assets/images/stellar_blade.png';
import unifiedArtImage from '../assets/images/p2.png';

const tabs = [
  {
    id: 'standAloneArtContent',
    label: 'Stand Alone Art Content',
    image: standAloneArtImage,
    subtitle: 'Create the highest quality content in a variety of artistic styles'
  },
  {
    id: 'unifiedArtContent',
    label: 'Unified Art Content',
    image: unifiedArtImage,
    subtitle: 'Produce entire pipelines of assets from ideation to in-engine integration'
  },
];

const detailsData = {
  standAloneArtContent: [
    {
      title: 'Concept Art',
      description: 'Produce art pieces that convey the game\'s ideas, style, and tone',
      expanded: true,
    },
    {
      title: '2D & 3D Assets',
      description: 'Produce 2D and 3D assets in a chosen artistic style',
      expanded: false,
    },
    {
      title: 'Animation',
      description: 'Animate virtual worlds through rigging, keyframe animation, motion capture and more',
      expanded: false,
    },
    {
      title: 'Lighting & VFX',
      description: 'Create visual effects such as explosions, fire, lighting, smoke, and fluid and hair simulation',
      expanded: false,
    },
  ],
  unifiedArtContent: [
    {
      title: 'Levels',
      description: 'Craft expansive environments that enhance worlds, from brief to in-engine release',
      expanded: true,
    },
    {
      title: 'Characters',
      description: 'Produce memorable characters that integrate within the game\'s universe, from thematic development to release',
      expanded: false,
    },
    {
      title: 'Cinematics',
      description: 'Create breathtaking cinematographic pieces serving the lore and story of your game, from script to in-engine integrated cinematics.',
      expanded: false,
    },
  ],
};

export default function OurExpertise2() {
  const [activeTab, setActiveTab] = useState('standAloneArtContent');
  const [details, setDetails] = useState(detailsData);

  const toggleDetail = (tabId, index) => {
    setDetails((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails[tabId] = newDetails[tabId].map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      );
      return newDetails;
    });
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="bg-gray-900 text-white py-16 px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto font-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-7xl font-bold mb-12 text-center uppercase font-primary">
          Our Art Expertise
        </h2>

        {/* Tabs Navigation */}
        <nav className="flex overflow-x-auto pb-2 mb-10 scrollbar-hide">
          <div className="flex space-x-1 sm:space-x-4 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap text-sm sm:text-base font-medium ${
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
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-xl shadow-2xl">
            <div
              className="h-64 sm:h-80 md:h-96 w-full bg-cover bg-center transition-all duration-500 transform group-hover:scale-105"
              style={{ backgroundImage: `url(${activeTabData.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-primary">
                    {activeTabData.label}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-1 max-w-md">
                    {activeTabData.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            {details[activeTab].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl transition-all duration-300 shadow-md"
              >
                <button
                  onClick={() => toggleDetail(activeTab, index)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-700/50 transition"
                  aria-expanded={item.expanded}
                >
                  <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                  <span className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold select-none text-lg">
                    {item.expanded ? '−' : '+'}
                  </span>
                </button>
                {item.expanded && (
                  <div className="px-5 pb-4 text-gray-300 leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
