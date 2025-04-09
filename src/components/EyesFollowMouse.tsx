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
    
    // Update mouse position relative to the center of the eyes container
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

  // Set up random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // Calculate the position of the pupils based on mouse position
    // with slightly different behavior for each eye for a more natural look
    const maxMovement = 10;
    const angle = Math.atan2(mousePosition.y, mousePosition.x);
    const distance = Math.min(
      Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2),
      50
    );
    const normalizedDistance = Math.min(distance / 50, 1) * maxMovement;
    
    // Base movement for both eyes
    const baseX = Math.cos(angle) * normalizedDistance;
    const baseY = Math.sin(angle) * normalizedDistance;
    
    // Slightly different behavior for each eye
    setEyePositions([
      { x: baseX * 0.95, y: baseY }, // Left eye
      { x: baseX * 1.05, y: baseY }, // Right eye - slight variation
    ]);
  }, [mousePosition]);

  return (
    <div 
      ref={eyesContainerRef}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 z-10"
      aria-hidden="true"
    >
      {/* Left eye */}
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div 
          className={`w-7 h-7 bg-blue-600 rounded-full relative ${isBlinking ? 'h-[2px] mt-1' : ''}`}
          style={{
            transform: isBlinking ? 'none' : `translate(${eyePositions[0].x}px, ${eyePositions[0].y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {!isBlinking && <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>}
        </div>
      </div>
      
      {/* Right eye */}
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div 
          className={`w-7 h-7 bg-blue-600 rounded-full relative ${isBlinking ? 'h-[2px] mt-1' : ''}`}
          style={{
            transform: isBlinking ? 'none' : `translate(${eyePositions[1].x}px, ${eyePositions[1].y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {!isBlinking && <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>}
        </div>
      </div>
    </div>
  );
}; 