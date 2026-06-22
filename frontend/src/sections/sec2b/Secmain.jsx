import React, { useState, useEffect, useRef } from "react";
import Card from "./Card.jsx";
import Jobdata from "./Jobdata.jsx";

const Secmain = () => {
  // Data ko triple kar rahe hain takay gaps na aayein
  const tripleData = [...Jobdata, ...Jobdata, ...Jobdata];
  const cardWidth = 280;
  const gap = 32;
  const cardFullWidth = cardWidth + gap;
  const singleSetWidth = Jobdata.length * cardFullWidth;

  // Pixel-based scrolling state
  const [scrollX, setScrollX] = useState(-singleSetWidth);
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeed = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      const mouseX = e.clientX;
      const edgeSize = 150;

      if (mouseX > width - edgeSize) {
        scrollSpeed.current = -2.5; // Right move
        setIsHovering(true);
      } else if (mouseX < edgeSize) {
        scrollSpeed.current = 2.5; // Left move
        setIsHovering(true);
      } else {
        scrollSpeed.current = 0; // Stop
        setIsHovering(false);
      }
    };

    const updateScroll = () => {
      setScrollX((prev) => {
        let newX = prev + scrollSpeed.current;

        // INFINITE LOGIC: Agar end pe jaye to foran center pe reset kar do
        if (newX <= -(singleSetWidth * 2)) {
          newX = -singleSetWidth;
        }
        if (newX >= 0) {
          newX = -singleSetWidth;
        }
        return newX;
      });
      requestAnimationFrame(updateScroll);
    };

    const animationId = requestAnimationFrame(updateScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [singleSetWidth]);



  return (
    <div className="w-full overflow-hidden h-full  pt-5  "> {/* pb-28 added to fix bottom cut */}
      <div
        className="flex gap-8 will-change-transform"
        style={{
          transform: `translateX(${scrollX}px)`,
          // Hovering ke waqt transition 'none' honi chahiye takay pixels smooth chalein
          transition: isHovering ? "none" : "transform 0.4s ease-out"
        }}
      >
        {tripleData.map((job, i) => (
          <div
            key={`${job.id}-${i}`}
            className="min-w-[280px] flex-shrink-0 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-3xl"
          >
            <Card {...job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Secmain;