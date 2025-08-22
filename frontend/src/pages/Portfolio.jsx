import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Nova Starlight',
    role: 'Lead Designer',
    bio: 'Creates immersive UI/UX that pulls players into the game world',
    placeholder: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Orion Vector',
    role: 'Physics Engineer',
    bio: 'Develops realistic game physics and collision systems',
    placeholder: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Lyra Nebulon',
    role: 'Concept Artist',
    bio: 'Brings game worlds to life with stunning environmental art',
    placeholder: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'Titan Void',
    role: 'AI Developer',
    bio: 'Creates intelligent NPC behaviors and enemy AI systems',
    placeholder: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    name: 'Pulsar Byte',
    role: 'Gameplay Programmer',
    bio: 'Implements core game mechanics and player controls',
    placeholder: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    name: 'Quasar Qubit',
    role: 'Network Engineer',
    bio: 'Builds multiplayer infrastructure and netcode',
    placeholder: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60',
  },
   {
    id: 7,
    name: 'Cosmo Render',
    role: 'Graphics Engineer',
    bio: 'Optimizes rendering pipelines for maximum performance',
    placeholder: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 8,
    name: 'Eclipse Shader',
    role: 'VFX Artist',
    bio: 'Creates stunning visual effects and particle systems',
    placeholder: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60',
  }
];

const TeamPortfolio = () => {
  const controls = useAnimation();
  const bgRef = useRef(null);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const cursorRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = bgRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      controls.start({
        x: x * 80,
        y: y * 80,
        transition: { type: 'spring', damping: 15, stiffness: 100 }
      });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px) rotate(${x * 45}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  return (
    <div className="relative overflow-hidden bg-gray-950 min-h-screen">
      {/* Gaming Background */}
      <motion.div 
        className="fixed inset-0 overflow-hidden"
        animate={controls}
        ref={bgRef}
        style={{
          background: 'radial-gradient(ellipse at center, #0f0c29 0%, #1a1a2e 50%, #000000 100%)'
        }}
      >
        {/* Animated elements */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              url('https://www.transparenttextures.com/patterns/carbon-fibre.png'),
              url('https://www.transparenttextures.com/patterns/dark-geometric.png')
            `,
            backgroundBlendMode: 'overlay',
            opacity: 0.4
          }}
        />

        {/* Floating elements */}
        <motion.div
          className="absolute rounded-full bg-[#BA7A2B]"
          style={{
            width: '400px',
            height: '400px',
            top: '20%',
            left: '15%',
            filter: 'blur(80px)',
            opacity: 0.3
          }}
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#BA7A2B] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(186, 122, 43, 0.8)'
            }}
            animate={{
              x: [0, window.innerWidth],
              y: [0, window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 10
            }}
          />
        ))}
      </motion.div>

      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed -left-4 -top-4 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'radial-gradient(circle, rgba(186, 122, 43, 0.8) 0%, rgba(186, 122, 43, 0) 70%)',
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BA7A2B] to-[#D4A76A]">GAME</span> DEVELOPERS
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto font-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The talented team crafting immersive gaming experiences that push technical boundaries
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ 
                opacity: 0, 
                y: 50,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                } 
              }}
              whileHover={{ 
                y: -15,
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(186, 122, 43, 0.25)',
                transition: { duration: 0.3 }
              }}
              className="bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-[#BA7A2B] transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.placeholder} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white font-primary">{member.name}</h3>
                  <p className="text-[#BA7A2B] font-secondary">{member.role}</p>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#BA7A2B] rounded-full animate-pulse" />
              </div>
              <div className="p-6">
                <p className="text-gray-300 text-sm font-secondary line-clamp-2">{member.bio}</p>
                <div className="flex mt-4 space-x-3">
                  <button className="text-gray-400 hover:text-[#BA7A2B] transition-colors">
                    <Linkedin size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-[#BA7A2B] transition-colors">
                    <Github size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-[#BA7A2B] transition-colors">
                    <Twitter size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                className="relative bg-gray-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-[#BA7A2B] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.95) 100%)'
                }}
              >
                <button 
                  className="absolute top-4 right-4 z-10 p-2 bg-gray-800 rounded-full hover:bg-[#BA7A2B] transition-colors"
                  onClick={() => setSelectedMember(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative min-h-[500px]">
                    <img 
                      src={selectedMember.placeholder} 
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <h2 className="text-4xl font-bold text-white font-primary">{selectedMember.name}</h2>
                      <p className="text-[#BA7A2B] text-2xl font-secondary mt-2">{selectedMember.role}</p>
                    </div>
                    <div className="absolute top-8 left-8 w-4 h-4 bg-[#BA7A2B] rounded-full animate-pulse" />
                  </div>

                  <div className="p-8">
                    <div className="mb-8">
                      <h3 className="text-white font-semibold text-xl mb-4 font-primary tracking-wider">DEVELOPER PROFILE</h3>
                      <p className="text-gray-300 font-secondary">{selectedMember.bio}</p>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-white font-semibold text-xl mb-4 font-primary tracking-wider">SPECIALTIES</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Game Physics', 'AI Programming', '3D Rendering', 'Network Code', 'Gameplay Systems', 'UI/UX'].map((skill) => (
                            <motion.span 
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-200 hover:bg-[#BA7A2B] transition-colors font-secondary"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold text-xl mb-4 font-primary tracking-wider">CONTACT</h3>
                        <div className="flex space-x-4">
                          <motion.button 
                            whileHover={{ y: -3 }}
                            className="p-3 bg-gray-800 rounded-full text-gray-300 hover:bg-[#BA7A2B] hover:text-white transition-colors"
                          >
                            <Linkedin size={20} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ y: -3 }}
                            className="p-3 bg-gray-800 rounded-full text-gray-300 hover:bg-[#BA7A2B] hover:text-white transition-colors"
                          >
                            <Mail size={20} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ y: -3 }}
                            className="p-3 bg-gray-800 rounded-full text-gray-300 hover:bg-[#BA7A2B] hover:text-white transition-colors"
                          >
                            <Github size={20} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#BA7A2B]/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

        
        </motion.section>

      
      </div>
    </div>
  );
};

export default TeamPortfolio;