// import React from 'react';
// import { FaLightbulb, FaGlobe } from 'react-icons/fa';
// import { GiTrophy } from 'react-icons/gi';
// import { useTheme } from '../../contexts/ThemeContext';
// import Button from '../UI/Button';

// const GameJamFeatures = () => {
//   const { themeClasses } = useTheme();

//   const features = [
//     {
//       id: 1,
//       icon: FaLightbulb,
//       title: "GGJ NEXT",
//       description: "GGJ Next is a jam for kids 10-18 who are interested in learning the creation of video games.",
//       buttonText: "FIND OUT MORE",
//       buttonColor: "bg-blue-500 hover:bg-blue-600",
//       link: "/ggjnext"
//     },
//     {
//       id: 2,
//       icon: GiTrophy,
//       title: "UNIVERSITY CHALLENGE JAM",
//       description: "Tackle a social impact topic for the chance to turn your jam game into a $10K scholarship.",
//       buttonText: "LEARN MORE",
//       buttonColor: "bg-blue-500 hover:bg-blue-600",
//       link: "/university-challenge"
//     },
//     {
//       id: 3,
//       icon: FaGlobe,
//       title: "APPLY FOR STIPEND",
//       description: "As we seek to grow GGJ Next around the globe, stipends are available for most countries.",
//       buttonText: "LEARN MORE",
//       buttonColor: "bg-blue-500 hover:bg-blue-600",
//       link: "/stipend"
//     }
//   ];

//   return (
//     <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.bg}`}>
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.text} mb-4`}>
//             Join the Global Game Development Community
//           </h2>
//           <p className={`text-lg ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
//             Discover opportunities designed for creators at every level, from beginners to university students.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature) => {
//             const IconComponent = feature.icon;
//             return (
//               <div 
//                 key={feature.id}
//                 className={`${themeClasses.cardBg} p-8 rounded-2xl shadow-lg border ${themeClasses.border} hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
//               >
//                 <div className="text-center">
//                   {/* Icon */}
//                   <div className={`w-16 h-16 ${themeClasses.accentBg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                     <IconComponent className="text-white text-2xl" />
//                   </div>

//                   {/* Title */}
//                   <h3 className={`text-xl font-bold ${themeClasses.text} mb-4`}>
//                     {feature.title}
//                   </h3>

//                   {/* Description */}
//                   <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>
//                     {feature.description}
//                   </p>

//                   {/* Button */}
//                   <button 
//                     className={`${feature.buttonColor} text-white px-6 py-2 rounded-full transition-colors font-semibold text-sm tracking-wide`}
//                     onClick={() => {
//                       // Handle navigation or action
//                       console.log(`Navigate to: ${feature.link}`);
//                     }}
//                   >
//                     {feature.buttonText}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Additional CTA Section */}
//         <div className="mt-16 text-center">
//           <div className={`${themeClasses.cardBg} rounded-2xl p-8 border ${themeClasses.border} shadow-lg`}>
//             <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
//               Ready to Start Your Game Development Journey?
//             </h3>
//             <p className={`${themeClasses.textSecondary} mb-6 max-w-2xl mx-auto`}>
//               Join thousands of creators worldwide and turn your ideas into reality. 
//               Whether you're a beginner or experienced developer, there's a place for you.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button variant="primary" size="lg">
//                 Get Started Today
//               </Button>
//               <Button variant="secondary" size="lg">
//                 Learn More About Game Jams
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GameJamFeatures;



import React from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

export default function GameJamFeatures() {
  const { themeClasses } = useTheme();

  const items = [
    {
      icon: "💡",
      title: "GGJ NEXT",
      text: "GGJ Next is a jam for kids 10–18 who are interested in learning the creation of video games.",
      cta: "Find out more",
    },
    {
      icon: "🏆",
      title: "G4C–GGJ University Student Challenge Jam",
      text: "Tackle a social impact topic for the chance to turn your jam game into a $10K scholarship.",
      cta: "Learn more",
    },
    {
      icon: "🌍",
      title: "Apply for Stipend",
      text: "As we seek to grow GGJ Next around the globe, stipends are available for most countries.",
      cta: "Learn more",
    },
  ];

  return (
    <section className={`${themeClasses.bg} py-12 md:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((x, i) => (
            <div
              key={i}
              className={`${themeClasses.cardBg} rounded-2xl shadow-md border ${themeClasses.border} p-8 text-center`}
            >
              <div className="text-5xl mb-4">{x.icon}</div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>{x.title}</h3>
              <p className={`${themeClasses.textSecondary} mb-6`}>{x.text}</p>
              <button className={`${themeClasses.accentBg} text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition`}>
                {x.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
