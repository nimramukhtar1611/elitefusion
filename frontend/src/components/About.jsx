import { useEffect, useRef } from 'react';
import dinasor from '../assets/images/dinasor.jpg';
import homeoverlay from '../assets/images/home-hero-btm-overlay.webp';

const About = () => {
  const counterRefs = useRef([]);
  
  useEffect(() => {
    const animateCounters = () => {
      counterRefs.current.forEach((counter, index) => {
        if (!counter) return;
        
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          counter.textContent = Math.floor(current) + 
            ([0, 2, 4].includes(index) ? '+' : '');
        }, 16);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('about-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      className="relative w-full bg-cover bg-center bg-no-repeat text-white overflow-x-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${dinasor})`,
        minHeight: '100vh',
      }}
    >
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#BA7A2B]"
            style={{
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Top Edge Blur */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      
      {/* Bottom Edge Blur */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Overlay Image */}
      <img
        src={homeoverlay}
        alt="Overlay"
        className="absolute bottom-0 left-0 w-full h-auto z-0 pointer-events-none opacity-80"
        style={{ height: 'auto' }}
      />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col min-h-screen px-4 sm:px-6 lg:px-12 pt-32 pb-20 lg:min-h-[200vh] bg-[#25282A]/10">
        {/* Heading and Text Section */}
        <div className="w-full max-w-6xl mx-auto mb-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold leading-tight mb-8 font-primary">
          Developing Spaces<br/> 
              That Engage and Inspire
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 font-secondary">
              Founded in 2004 and headquartered in Singapore with over<br />
              4200 employees across 25 offices in Asia, Europe, and<br />
              North America, Virtuos is one of the largest independent<br />
              video game development companies. Specializing in full-cycle<br />
              game development and art production, we have delivered<br />
              high-quality content for over 1,500 games across all<br />
              platforms, working with 23 of the top 25 gaming<br />
              companies worldwide.
            </p>
          </div>
        </div>

        {/* Centered Stats Section */}
        <div className="w-full max-w-[83rem] mx-auto mt-40 pt-10">
          <div className="flex flex-wrap items-center justify-center gap-y-20 gap-x-14 font-primary">
            {[
              { value: 4200, label: 'People',  },
              { value: 25, label: 'Locations'},
              { value: 900, label: 'Clients' },
              { value: 21, label: 'Years', },
              { value: 1500, label: 'Titles',  },
            ].map((item, index) => (
              <div key={index} className="flex items-center group">
                <div className="text-center relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">
                    {item.icon}
                  </div>
                  <div 
                    ref={el => counterRefs.current[index] = el}
                    data-target={item.value}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#BA7A2B] transition-all duration-300 group-hover:text-white group-hover:scale-110"
                  >
                    0{index % 2 === 0 ? '+' : ''}
                  </div>
                  <div className="text-xs sm:text-sm uppercase mt-2 text-blue-200 tracking-widest transition-all duration-300 group-hover:text-[#BA7A2B]">
                    {item.label}
                  </div>
                </div>
                
                {index < 4 && (
                  <div className="mx-6 text-8xl text-[#6A919F] font-light rotate-12 h-24 flex items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">/</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default About;