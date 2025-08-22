import React from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import CloudSeparator from "./CloudSeparator.jsx";

export default function Sponsors() {
  const { themeClasses } = useTheme();

  return (
    <section className={`${themeClasses.bg}`}>
      <CloudSeparator flip />
      <div className="bg-sky-100 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-sky-900 dark:text-white mb-4">
            GGJ NEXT isn’t possible without our generous sponsors.
          </h2>
          <p className={`${themeClasses.textSecondary} mb-10`}>
            Learn how your company can become a part of this excellent educational event.
          </p>
          <button className="px-8 py-4 rounded-full font-semibold bg-orange-600 hover:bg-orange-700 text-white">
            Sponsor GGJ NEXT
          </button>
        </div>
      </div>
    </section>
  );
}
