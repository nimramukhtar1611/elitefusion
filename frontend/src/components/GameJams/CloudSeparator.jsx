import React from "react";

const CloudSeparator = ({ flip = false, className = "", fillClass = "fill-sky-100 dark:fill-slate-800" }) => (
  <svg
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`w-full ${flip ? "rotate-180" : ""} ${className}`}
  >
    <path
      className={fillClass}
      d="M0,64L48,58.7C96,53,192,43,288,64C384,85,480,139,576,154.7C672,171,768,149,864,128C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,0L0,0Z"
    />
  </svg>
);

export default CloudSeparator;
