// LoadingSpinner.tsx
import React from "react";

import "./loader.css";

const LoadingSpinner: React.FC = () => {
  return (
        <div className="loader">
            <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>
        </div>
  );
};

export default LoadingSpinner;
