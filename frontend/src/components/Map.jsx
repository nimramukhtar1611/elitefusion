import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import mapImg from '../assets/images/mapbg.png';

// Shine animation
const shineAnimation = `
  @keyframes shine {
    0% { opacity: 0.6; filter: brightness(1); }
    50% { opacity: 1; filter: brightness(1.5); }
    100% { opacity: 0.6; filter: brightness(1); }
  }
`;

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country image URLs
const countryImages = {
  'Saudi Arabia': 'https://images.unsplash.com/photo-1518632611755-5d5c7610d0e2?w=500&auto=format&fit=crop',
  'United Arab Emirates': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&auto=format&fit=crop',
  'Egypt': 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=500&auto=format&fit=crop',
  'India': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&auto=format&fit=crop',
  'Pakistan': 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=500&auto=format&fit=crop',
  'United States': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&auto=format&fit=crop',
  'European Union': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&auto=format&fit=crop',
  'Japan': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=500&auto=format&fit=crop'
};

// For European Union, we'll use major EU countries
const euCountries = {
  'Germany': [13.4050, 52.5200],
  'France': [2.3522, 48.8566],
  'Italy': [12.4964, 41.9028],
  'Spain': [-3.7038, 40.4168],
  'Netherlands': [4.8952, 52.3702]
};

// Studio location data with additional details
const regionConfigs = {
  'ALL': {
    scale: 120,
    center: [60, 30],
    studios: [
      { 
        name: "Riyadh", 
        coordinates: [46.6753, 24.7136], 
        region: "MIDDLE EAST", 
        country: "Saudi Arabia",
        details: "Our Riyadh office leads operations in the Gulf region with focus on Arabic content localization."
      },
      { 
        name: "Dubai", 
        coordinates: [55.2708, 25.2048], 
        region: "MIDDLE EAST", 
        country: "United Arab Emirates",
        details: "Dubai studio specializes in luxury gaming experiences and high-end mobile applications."
      },
      { 
        name: "Cairo", 
        coordinates: [31.2357, 30.0444], 
        region: "MIDDLE EAST", 
        country: "Egypt",
        details: "Cairo location handles North African market operations and Arabic content production."
      },
      { 
        name: "Mumbai", 
        coordinates: [72.8777, 19.0760], 
        region: "SOUTH ASIA", 
        country: "India",
        details: "Mumbai studio focuses on mobile gaming and regional content for the Indian subcontinent."
      },
      { 
        name: "Karachi", 
        coordinates: [67.0011, 24.8607], 
        region: "SOUTH ASIA", 
        country: "Pakistan",
        details: "Karachi office specializes in backend development and technical support services."
      },
      { 
        name: "New York", 
        coordinates: [-74.0060, 40.7128], 
        region: "NORTH AMERICA", 
        country: "United States",
        details: "NYC location handles business development and publisher relations for North America."
      },
      { 
        name: "Berlin", 
        coordinates: euCountries['Germany'], 
        region: "EUROPE", 
        country: "Germany",
        details: "Berlin office coordinates our European operations and regulatory compliance."
      },
      { 
        name: "Tokyo", 
        coordinates: [139.6917, 35.6895], 
        region: "ASIA", 
        country: "Japan",
        details: "Tokyo office leads our Asian market strategy and high-end console game development."
      }
    ]
  },
  'MIDDLE EAST': {
    scale: 400,
    center: [50, 25],
    studios: [
      { 
        name: "Riyadh", 
        coordinates: [46.6753, 24.7136], 
        region: "MIDDLE EAST", 
        country: "Saudi Arabia",
        details: "Our Riyadh office leads operations in the Gulf region with focus on Arabic content localization."
      },
      { 
        name: "Dubai", 
        coordinates: [55.2708, 25.2048], 
        region: "MIDDLE EAST", 
        country: "United Arab Emirates",
        details: "Dubai studio specializes in luxury gaming experiences and high-end mobile applications."
      },
      { 
        name: "Cairo", 
        coordinates: [31.2357, 30.0444], 
        region: "MIDDLE EAST", 
        country: "Egypt",
        details: "Cairo location handles North African market operations and Arabic content production."
      }
    ]
  },
  'SOUTH ASIA': {
    scale: 400,
    center: [75, 20],
    studios: [
      { 
        name: "Mumbai", 
        coordinates: [72.8777, 19.0760], 
        region: "SOUTH ASIA", 
        country: "India",
        details: "Mumbai studio focuses on mobile gaming and regional content for the Indian subcontinent."
      },
      { 
        name: "Karachi", 
        coordinates: [67.0011, 24.8607], 
        region: "SOUTH ASIA", 
        country: "Pakistan",
        details: "Karachi office specializes in backend development and technical support services."
      }
    ]
  },
  'NORTH AMERICA': {
    scale: 300,
    center: [-100, 40],
    studios: [
      { 
        name: "New York", 
        coordinates: [-74.0060, 40.7128], 
        region: "NORTH AMERICA", 
        country: "United States",
        details: "NYC location handles business development and publisher relations for North America."
      }
    ]
  },
  'EUROPE': {
    scale: 400,
    center: [15, 50],
    studios: [
      { 
        name: "Berlin", 
        coordinates: euCountries['Germany'], 
        region: "EUROPE", 
        country: "Germany",
        details: "Berlin office coordinates our European operations and regulatory compliance."
      },
      { 
        name: "Paris", 
        coordinates: euCountries['France'], 
        region: "EUROPE", 
        country: "France",
        details: "Paris location handles our French market operations and partnerships."
      }
    ]
  },
  'ASIA': {
    scale: 300,
    center: [100, 30],
    studios: [
      { 
        name: "Tokyo", 
        coordinates: [139.6917, 35.6895], 
        region: "ASIA", 
        country: "Japan",
        details: "Tokyo office leads our Asian market strategy and high-end console game development."
      }
    ]
  }
};

const Map = () => {
  const [activeRegion, setActiveRegion] = useState('ALL');
  const [hoveredStudio, setHoveredStudio] = useState(null);
  const [selectedStudio, setSelectedStudio] = useState(null);

  const currentConfig = regionConfigs[activeRegion];
  const studioCountries = currentConfig.studios.map((studio) => studio.country);

  const handleMarkerClick = (studio) => {
    setSelectedStudio(studio);
  };

  const closeModal = () => {
    setSelectedStudio(null);
  };

  return (
    <div className="bg-[#25282A] text-white py-16 px-4 relative">
      <style>{shineAnimation}</style>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center uppercase font-primary">
          GLOBAL PRESENCE
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-center max-w-3xl mx-auto font-secondary mb-10 px-4">
          Access our distributed network of offices and tap into our global talent and expertise.
          We operate in key markets across the world to serve your needs.
        </p>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mb-10 text-base sm:text-lg font-secondary">
          {Object.keys(regionConfigs).map((region, idx) => (
            <React.Fragment key={region}>
              <button
                className={`${
                  activeRegion === region
                    ? 'text-white font-bold underline underline-offset-4'
                    : 'text-gray-400'
                } transition duration-200`}
                onClick={() => setActiveRegion(region)}
              >
                {region}
              </button>
              {idx < Object.keys(regionConfigs).length - 1 && (
                <span className="text-gray-500 hidden sm:inline">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Map container */}
        <div
          className="relative rounded-3xl overflow-hidden border-0 lg:border-2 border-gray-700"
          style={{
            backgroundImage: `url(${mapImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '600px'
          }}
        >
          <div className="absolute inset-0">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: currentConfig.scale,
                center: currentConfig.center
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const hasStudio = studioCountries.includes(geo.properties.name);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgb(4, 82, 107)"
                        stroke="rgba(51, 65, 85, 0.8)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: { fill: 'rgb(90, 155, 175)' }
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {currentConfig.studios.map((studio) => (
                <Marker
                  key={`${studio.name}-${studio.coordinates.join(',')}`}
                  coordinates={studio.coordinates}
                >
                  <g
                    onMouseEnter={() => setHoveredStudio(studio.name)}
                    onMouseLeave={() => setHoveredStudio(null)}
                    onClick={() => handleMarkerClick(studio)}
                    style={{ cursor: 'pointer' }}
                  >
                    {hoveredStudio === studio.name && (
                      <circle r={6} fill="#DC7D28" fillOpacity="0.6" />
                    )}
                    <circle
                      r={15}
                      fill="#FFC695"
                      fillOpacity={hoveredStudio === studio.name ? "0.4" : "0.2"}
                      style={{ animation: 'shine 2s infinite' }}
                    />
                    <circle
                      r={8}
                      fill="#FFC695"
                      stroke="#DC7D28"
                      strokeWidth={1.5}
                      style={{
                        filter: hoveredStudio === studio.name ? 'brightness(5)' : 'brightness(1)',
                        transition: 'filter 0.3s ease'
                      }}
                      data-tooltip-id="studio-tooltip"
                      data-tooltip-content={studio.name}
                    />
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          <ReactTooltip
            id="studio-tooltip"
            className="!bg-[#25282A] !text-white !px-3 !py-2 !rounded-md"
            place="top"
          />
        </div>
      </div>

      {/* Country Details Modal */}
      {selectedStudio && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-[#25282A] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-[#DC7D28] rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-[#e68a3e] transition-colors"
              >
                &times;
              </button>
              
              {/* Country image */}
              <div className="h-48 sm:h-64 w-full overflow-hidden">
                <img 
                  src={countryImages[selectedStudio.country] || 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&auto=format&fit=crop'}
                  alt={selectedStudio.country}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold">{selectedStudio.name}</h2>
                  <span className="text-[#DC7D28] font-semibold mt-2 sm:mt-0">{selectedStudio.country}</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2 text-[#DC7D28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{selectedStudio.region}</span>
                  </div>
                  
                  <p className="text-gray-300 mt-4">{selectedStudio.details}</p>
                </div>
                
                <div className="bg-[#333] p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-[#DC7D28]">Office Highlights</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Specializes in {selectedStudio.region} market</li>
                    <li>50+ professionals</li>
                    <li>Established in {Math.floor(Math.random() * 10) + 2010}</li>
                    <li>Focus on {selectedStudio.details.split(' ').slice(-3).join(' ').replace('.', '')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;