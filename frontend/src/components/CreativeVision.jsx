// Import images
import dune from '../assets/images/creativeOne.jpg';
import darkSouls from '../assets/images/dark_souls.png';
import judas from '../assets/images/judas.png';
import outriders from '../assets/images/p2.png';
import stellarBlade from '../assets/images/stellar_blade.png';
import leagueOfLegends from '../assets/images/leagueo.png';
import artProductionImg from '../assets/images/art-production.png';

// Import icons for lists
import adaptationIcon from '../assets/icons/cryengine3.webp';
import postLaunchIcon from '../assets/icons/frostbite.webp';
import gameplayIcon from '../assets/icons/guerrilla.webp';
import gameIPIcon from '../assets/icons/unity.webp';
import engineEnhancementIcon from '../assets/icons/bird.webp';
import toolDevelopmentIcon from '../assets/icons/fox-engine.webp';
import renderingUpgradeIcon from '../assets/icons/marmalade.webp';
import performanceIcon from '../assets/icons/unreal-engine-4.webp';
import featureDevIcon from '../assets/icons/cryengine3.webp';
import networkingIcon from '../assets/icons/frostbite.webp';
import standaloneArtIcon from '../assets/icons/cryengine3.webp';
import unifiedArtIcon from '../assets/icons/frostbite.webp';

const CreativeVision = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white px-6 py-12 relative"
      style={{
        backgroundImage:
          "url('https://www.virtuosgames.com/wp-content/uploads/2024/11/3services_hero_1920x870_APNG.png')",
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-extrabold uppercase leading-tight font-primary mb-8 animate-fade-in">
            BREATHING LIFE INTO <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              CREATIVE VISIONS
            </span>
          </h1>
          <nav className="mt-6 text-gray-300 uppercase tracking-widest text-sm flex justify-center gap-6 flex-wrap">
            <a href="#game-development" className="hover:text-orange-400 cursor-pointer font-secondary transition-colors duration-300 hover:scale-105 transform">
              Game Development
            </a>
            <span className="text-orange-500">/</span>
            <a href="#engineering" className="hover:text-orange-400 cursor-pointer font-secondary transition-colors duration-300 hover:scale-105 transform">
              Engineering
            </a>
            <span className="text-orange-500">/</span>
            <a href="#art-production" className="hover:text-orange-400 cursor-pointer font-secondary transition-colors duration-300 hover:scale-105 transform">
              Art Production
            </a>
          </nav>
        </div>

        {/* Container with max width */}
        <div className="max-w-7xl mx-auto space-y-32 px-4 lg:px-20">
          {/* Game Development Section */}
          <section id="game-development" className="flex flex-col lg:flex-row items-center lg:items-start gap-20">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="relative">
                <h2 className="text-5xl lg:text-6xl font-bold uppercase font-primary mb-2">
                  Game Development
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mb-6"></div>
              </div>
              <p className="text-gray-300 font-secondary text-lg leading-relaxed">
                Tap on our co-development services, including level design, gameplay design, and remakes and adaptations.
              </p>
              <ul className="space-y-4 text-gray-300 font-secondary">
                {[
                  { icon: adaptationIcon, text: "Adaptation" },
                  { icon: postLaunchIcon, text: "Post Launch Content" },
                  { icon: gameplayIcon, text: "Gameplay & Design" },
                  { icon: gameIPIcon, text: "Game & IP Development" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 group hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={item.icon} alt={item.text} className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="relative inline-flex items-center px-8 py-4 text-sm font-medium text-white group w-48 justify-center bg-transparent border-0 mt-8 hover:scale-105 transform transition-all duration-300">
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 origin-top-left"></span>
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 origin-bottom-right"></span>
                <span className="relative z-10 tracking-wider">DISCOVER MORE</span>
              </button>
            </div>

            {/* Cards */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group hover:scale-105 transform transition-all duration-500">
                <img src={dune} alt="Dune: Awakening" className="w-full h-64 object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-1">Dune: Awakening</h3>
                  <p className="text-gray-300">Funcom</p>
                </div>
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl group hover:scale-105 transform transition-all duration-500">
                <img src={darkSouls} alt="Dark Souls: Remastered" className="w-full h-64 object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-xl mb-1">Dark Souls: Remastered</h3>
                    <p className="text-gray-300">Bandai Namco Entertainment</p>
                  </div>
                  <div className="bg-orange-500 rounded-full p-3 cursor-pointer hover:bg-orange-600 transition-all duration-300 hover:scale-110 transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </div>
          </section>

          {/* Engineering Section */}
          <section id="engineering" className="flex flex-col lg:flex-row items-center lg:items-start gap-20">
            {/* Cards */}
            <div className="lg:w-1/2 flex flex-col gap-8 order-last lg:order-first">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group hover:scale-105 transform transition-all duration-500">
                <img src={judas} alt="Judas" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-1">Judas</h3>
                  <p className="text-gray-300">Ghost Story Games</p>
                </div>
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl group hover:scale-105 transform transition-all duration-500">
                <img src={outriders} alt="Outriders" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-1">Outriders</h3>
                  <p className="text-gray-300">People Can Fly</p>
                </div>
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="relative">
                <h2 className="text-5xl lg:text-6xl font-bold uppercase font-primary mb-2">
                  Engineering
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mb-6"></div>
              </div>
              <p className="text-gray-300 font-secondary text-lg leading-relaxed">
                Address technical challenges in your development with cutting-edge tools, or refine gameplay, user interfaces and engines.
              </p>
              <ul className="space-y-4 text-gray-300 font-secondary">
                {[
                  { icon: engineEnhancementIcon, text: "Engine Enhancement" },
                  { icon: toolDevelopmentIcon, text: "Tool Development" },
                  { icon: renderingUpgradeIcon, text: "Rendering Upgrade" },
                  { icon: performanceIcon, text: "Performance Optimisation" },
                  { icon: featureDevIcon, text: "Feature Development" },
                  { icon: networkingIcon, text: "Networking & Infrastructure" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 group hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={item.icon} alt={item.text} className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="relative inline-flex items-center px-8 py-4 text-sm font-medium text-white group w-48 justify-center bg-transparent border-0 mt-8 hover:scale-105 transform transition-all duration-300">
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 origin-top-left"></span>
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 origin-bottom-right"></span>
                <span className="relative z-10 tracking-wider">DISCOVER MORE</span>
              </button>
            </div>
          </section>

          {/* Art Production Section */}
          <section id="art-production" className="flex flex-col lg:flex-row items-center lg:items-start gap-20">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="relative">
                <h2 className="text-5xl lg:text-6xl font-bold uppercase font-primary mb-2">
                  Art Production
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mb-6"></div>
              </div>
              <p className="text-gray-300 font-secondary text-lg leading-relaxed">
                Realize your vision through concept art, or leverage the talent of art specialists as we deliver high-quality assets—and more—across your production pipeline.
              </p>
              <ul className="space-y-4 text-gray-300 font-secondary">
                {[
                  { icon: standaloneArtIcon, text: "Standalone Art Content" },
                  { icon: unifiedArtIcon, text: "Unified Art Content" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 group hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={item.icon} alt={item.text} className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="relative inline-flex items-center px-8 py-4 text-sm font-medium text-white group w-48 justify-center bg-transparent border-0 mt-8 hover:scale-105 transform transition-all duration-300">
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 origin-top-left"></span>
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 origin-bottom-right"></span>
                <span className="relative z-10 tracking-wider">DISCOVER MORE</span>
              </button>
            </div>

            {/* Cards */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group hover:scale-105 transform transition-all duration-500">
                <img src={stellarBlade} alt="Stellar Blade" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-1">Stellar Blade</h3>
                  <p className="text-gray-300">Shift Up</p>
                </div>
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl group hover:scale-105 transform transition-all duration-500">
                <img src={leagueOfLegends} alt="League of Legends" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-1">League of Legends</h3>
                  <p className="text-gray-300">Riot Games</p>
                </div>
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CreativeVision;