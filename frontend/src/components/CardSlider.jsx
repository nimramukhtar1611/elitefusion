import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { games } from "../data"; 

const CardSlider = () => {
  return (
    <section className="bg-gradient-to-b from-[#1c1e20] via-[#1c1e20] to-[#121416] text-white py-20 px-4 sm:px-6 lg:px-12">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl sm:text-7xl lg:text-7xl font-extrabold uppercase tracking-wide font-primary mb-8">
          Excellence in Every Project
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed mb-14">
          We have built a legacy of creating critically acclaimed, 
          award-winning games and setting new standards in development.
          From developing concepts, all the way to remaking classic 
          titles — we've done it all.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        className="custom-swiper"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[560px] mx-auto rounded overflow-hidden transition-transform duration-300 shadow-lg swiper-slide-card">
              <img
                src={game.image}
                alt={game.title}
                className="h-[560px] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 flex flex-col justify-end">
                <h2 className="text-white text-base font-semibold">
                  {game.title}
                </h2>
                <p className="text-white text-sm opacity-75">{game.studio}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination container */}
        <div className="custom-pagination mt-8 !relative !h-4"></div>
      </Swiper>

      {/* Custom styles */}
      <style jsx>{`
        .custom-swiper .swiper-slide {
          transition: transform 0.3s ease;
          transform: scale(0.88);
        }

        .custom-swiper .swiper-slide:hover {
          transform: scale(1);
          z-index: 5;
        }
        .custom-swiper .swiper-slide-active {
          transform: scale(1);
          z-index: 10;
        }

        .swiper-slide-card {
          border-radius: 1rem;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
        }

        /* Pagination Styles */
        .custom-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
        }

        .custom-pagination .swiper-pagination-bullet {
          width: 15px;
          height: 5px;
          background: white;
          opacity: 0.4;
          border-radius: 50%;
          margin: 0 6px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          width: 30px;
          height: 5px;
          border-radius: 9999px;
          background: #BA7A2B;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default CardSlider;