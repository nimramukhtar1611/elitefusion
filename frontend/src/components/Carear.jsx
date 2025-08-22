import React from 'react';
import carearBg from '../assets/images/carear.jpg';

const Career = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${carearBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#25282A',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#25282A] opacity-20 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1500px] px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between text-white text-center md:text-left">
        {/* Left Text Block */}
        <div className="w-full md:w-3/5 lg:w-1/2 mb-6 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold t uppercase font-primary mb-4">
            Ready to embark on your
            <br className="hidden sm:inline" /> game dev journey?
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-[90%] mx-auto md:mx-0 font-secondary leading-relaxed">
            Talent development is at the core of what we stand for. Join our global team and work on some of the most anticipated titles in the industry.
          </p>
        </div>

        {/* Optional Right Block (currently commented) */}
        {/* <div className="w-full md:w-1/3 mt-6 md:mt-0 text-center md:text-left">
          <p className="font-secondary font-medium mb-4">
            Level up your career at Virtuos, where every talent is a chapter in our saga.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded">
            Join Our Team
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Career;
