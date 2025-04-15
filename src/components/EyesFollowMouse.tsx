"use client";

import { useEffect, useRef, useState } from "react";

export const EyesFollowMouse = () => {
  const eyesContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePositions, setEyePositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [isBlinking, setIsBlinking] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!eyesContainerRef.current) return;

    const rect = eyesContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
  
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

 
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 2000); 

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const maxMovement = 8;
    const angle = Math.atan2(mousePosition.y, mousePosition.x);
    const distance = Math.min(
      Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2),
      50
    );
    const normalizedDistance = Math.min(distance / 50, 1) * maxMovement;
    

    const baseX = Math.cos(angle) * normalizedDistance;
    const baseY = Math.sin(angle) * normalizedDistance;
    
 
    setEyePositions([
      { x: baseX * 0.95, y: baseY }, 
      { x: baseX * 1.05, y: baseY }, 
    ]);
  }, [mousePosition]);

  return (
    <div 
      ref={eyesContainerRef}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4 z-10"
      aria-hidden="true"
    >
      <div className="bg-white/90 dark:bg-gray-800/90 py-1.5 px-3 rounded-full shadow-lg flex items-center gap-4 border border-gray-100 dark:border-gray-700">
        {/* Left eye */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div 
            className={`w-6 h-6 bg-blue-500 rounded-full relative ${isBlinking ? 'h-[2px] mt-1' : ''}`}
            style={{
              transform: isBlinking ? 'none' : `translate(${eyePositions[0].x}px, ${eyePositions[0].y}px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {!isBlinking && <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>}
          </div>
        </div>
        
        {/* Right eye */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div 
            className={`w-6 h-6 bg-blue-500 rounded-full relative ${isBlinking ? 'h-[2px] mt-1' : ''}`}
            style={{
              transform: isBlinking ? 'none' : `translate(${eyePositions[1].x}px, ${eyePositions[1].y}px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {!isBlinking && <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>}
          </div>
        </div>
      </div>
    </div>
  );
}; 