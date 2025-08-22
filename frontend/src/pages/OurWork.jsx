import React from 'react';

const portfolioItems = [
  { id: 8700, title: 'Judas', client: 'Ghost Story Games', image: 'https://as2.ftcdn.net/v2/jpg/07/91/72/11/1000_F_791721174_OKOwj2uaP5LDrY3Ft83oFx7x0aFxqCSU.jpg' },
  { id: 17523, title: '2XKO', client: 'Riot Games', image: 'https://uiparadox.co.uk/templates/pyxel/v2/assets/media/games/game-3.png' },
  { id: 1472, title: 'Dune: Awakening', client: 'Funcom', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/08/dune.png' },
  { id: 9717, title: 'New World: Aeternum', client: 'Amazon Games', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/10/new_world_aethernum.png' },
  { id: 10947, title: 'Age of Mythology: Retold', client: 'Microsoft Corporation', image: 'https://c4.wallpaperflare.com/wallpaper/951/583/798/fantasy-art-warrior-dark-souls-iii-dark-souls-wallpaper-preview.jpg' },
  { id: 17809, title: 'Predecessor', client: 'Omeda Studios', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/12/predecessor.jpg' },
  { id: 17811, title: 'Sea of Thieves', client: 'Rare', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/12/sea_of_thieves.jpg' },
  { id: 9705, title: 'Stellar Blade', client: 'Shift Up', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/10/stellar_blade.png' },
  { id: 17807, title: 'TopSpin 2K25e', client: '2K Games', image: 'https://w0.peakpx.com/wallpaper/362/59/HD-wallpaper-tekken-8-8k-tekken-8-2023-games-ps5-games-xbox-games-pc-games-games.jpg' },
  { id: 11035, title: 'Rise of the Ronin', client: 'Koei Tecmo Games', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/10/rise_of_ronin.png' },
  { id: 11029, title: 'Final Fantasy VII Rebirth', client: 'Square Enix Japan', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/10/ff7_rebirth.png' },
  { id: 10730, title: 'Call of Duty Warzone Mobile', client: 'Activision', image: 'https://www.virtuosgames.com/wp-content/uploads/2024/10/cod_warzone.png' },
];

const OurWork = () => {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center text-white py-6 px-4"
      style={{
        backgroundImage: "url('https://a-static.besthdwallpaper.com/asus-rog-republic-of-gamers-dark-themed-logo-wallpaper-1920x1440-53662_25.jpg')",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-8xl font-extrabold uppercase  drop-shadow-lg font-primary">
          Our Works
        </h2>
      </div>

      {/* Nav Tabs */}
      <nav className="flex justify-center mb-12">
        <ul className="flex gap-4 sm:gap-6 md:gap-10 px-6 py-3 rounded-full shadow-md text-sm md:text-base">
          <li><a href="/works/" className="hover:text-orange-600 text-white font-medium">All</a></li>
          <li><a href="/projects" className="text-orange-500 border-b-2 border-orange-400 font-bold">Projects</a></li>
          <li><a href="/success-stories" className="hover:text-orange-600 text-white font-medium">Success Stories</a></li>
          <li><a href="/market-insights/" className="hover:text-orange-600 text-white font-medium">Market Insights</a></li>
        </ul>
      </nav>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-2">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-xl shadow-lg group portfolio-box"
            style={{ minHeight: '300px' }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5 transition-opacity duration-300 group-hover:bg-black/70">
              <h4 className="text-xl font-bold mb-1 text-white drop-shadow-md">{item.title}</h4>
              <p className="text-sm italic text-gray-200">{item.client}</p>
            </div>
          </div>
        ))}
      </div>

   
    </section>
  );
};

export default OurWork;