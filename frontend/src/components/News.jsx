import React from 'react';
import men1 from '../assets/images/men1.jpg';
import men2 from '../assets/images/men2.jpg';
import men3 from '../assets/images/men3.jpg';

const News = () => {
  const newsItems = [
    {
      date: 'APRIL 28, 2025',
      headline: 'Powering New Zealand Game Studios with the Co-Development Model',
      image: men1
    },
    {
      date: 'APRIL 21, 2025',
      headline: 'This is the shortlist for the 2025 MCV/DEVELOP Awards!',
      image: men2
    },
    {
      date: 'APRIL 15, 2025',
      headline: "South Korea's role in Virtuos' 4200-member operating model - Sean Yoon interview",
      image: men3
    },
  ];

  return (
    <div className="bg-[#25282A] py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold mb-10 text-center uppercase font-primary text-white leading-tight">
          Latest News
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl overflow-hidden shadow-lg bg-[#1e1f20] transition-transform duration-300 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.headline}
                className="w-full h-64 sm:h-72 md:h-80 object-cover"
              />
              <div className="p-5">
                <p className="text-gray-400 text-xs sm:text-sm font-secondary mb-2">{item.date}</p>
                <h3 className="text-white text-base sm:text-lg font-semibold font-secondary leading-snug">
                  {item.headline}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
