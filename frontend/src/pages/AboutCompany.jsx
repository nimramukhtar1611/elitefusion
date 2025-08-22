import React from 'react';

const AboutUs = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://themewagon.github.io/beko/img/about_img.png"
              alt="About"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="text-4xl md:text-6xl font-bold text-[#DC7D28] mb-6 font-primary">
              About Us
            </h2>
            <p className="text-lg leading-relaxed font-secondary">
              We’re a creative team crafting exciting games for mobile, PC, console, and the metaverse.
              From solo quests to global multiplayer, our mission is to entertain and connect players everywhere.
              <br /><br />
              We innovate with NFTs, blockchain, and Web3 — giving players real ownership and new ways to play and earn.
              <br /><br />
              Beyond gaming, we inspire youth to become creators, not just consumers — turning passion into possibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
