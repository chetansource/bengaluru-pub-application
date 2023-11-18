"use client";
import { useState, useEffect } from "react";

const Loading = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="w-full h-2 bg-gray-700 relative overflow-hidden">
      <div className="h-full bg-black" style={{ width: `${percentage}%` }}>
        <div className="w-4 h-12 bg-blue-600 absolute"></div>
      </div>
    </div>
  );
};

export default Loading;
