import React from 'react';

const Careers = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat text-white px-6 py-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://uiparadox.co.uk/templates/pyxel/v2/assets/media/hero/hero-large.png')",
      }}
    >
      {/* Overlay with a subtle orange-tinted gradient for elegance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-orange-900/20 to-black/70 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with a refined, glowing effect */}
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 text-center text-white font-primary tracking-tight">
          Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Elite Fusion</span> Revolution
        </h1>

        <p className="text-lg sm:text-xl mb-12 text-center text-gray-200 font-secondary leading-relaxed max-w-3xl mx-auto">
          At <span className="text-orange-400 font-bold">Elite Fusion</span>, we forge unforgettable gaming experiences powered by blockchain innovation. Join our visionary team to shape the future of interactive entertainment.
        </p>

        {/* Why Join Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-400 font-primary mb-8 text-center tracking-wide">Why Choose Elite Fusion?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Pioneer Innovation',
                desc: 'Craft cutting-edge games and blockchain solutions that push industry boundaries.',
              },
              {
                title: 'Global Collaboration',
                desc: 'Work with a diverse, remote-first team of creators from around the world.',
              },
              {
                title: 'Empower Your Growth',
                desc: 'Unlock your potential with mentorship, advanced tools, and creative autonomy.',
              },
              {
                title: 'Exclusive Rewards',
                desc: 'Enjoy flexible schedules, competitive benefits, and access to premier gaming events.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/60 p-8 rounded-2xl shadow-xl border border-orange-500/20 hover:border-orange-500/50 hover:shadow-orange-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-orange-400 font-primary mb-3">{item.title}</h3>
                <p className="text-gray-300 font-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-400 font-primary mb-8 text-center tracking-wide">Open Roles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Game Developers (Unity / Unreal)',
              'Blockchain Engineers',
              '2D/3D Artists & Animators',
              'Game Designers',
              'QA Specialists',
              'Marketing & Community Leaders',
            ].map((role, index) => (
              <div
                key={index}
                className="relative bg-gray-800/70 p-6 rounded-xl shadow-lg border border-orange-500/20 hover:border-orange-500 hover:scale-105 transform transition-all duration-300 group"
              >
                <span className="text-lg font-medium text-gray-100 font-secondary group-hover:text-orange-400">{role}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="mb-6 text-xl font-semibold text-gray-100 font-primary">Ready to Shape the Future of Gaming?</p>
          <a
            href="mailto:careers@elitefusion.games"
            className="inline-block bg-orange-500 text-white font-bold px-10 py-4 rounded-full font-primary hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30"
          >
            Apply Now
          </a>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-sm text-gray-400 font-secondary tracking-wider">
          🎮 Remote-first team — Create epic experiences from anywhere
        </p>
      </div>
    </div>
  );
};

export default Careers;