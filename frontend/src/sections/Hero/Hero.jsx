import React from "react";
 import Heromain from "./Heromain.jsx";

const Hero = () => {
  return (
    <section className="relative flex flex-col min-h-screen w-full overflow-hidden"> 
      {/* Background with zoom fix */}
      <div className='fixed inset-0  bg-center bg-cover 
      bg-[url("/sections/Hero/bggg.png")] contrast-125 -z-10 brightness-[0.5] blur-[2px] scale-110' />
      
      <div className="flex flex-col z-20 w-full h-full">
        
          <div className="flex-1 flex items-center justify-center   pt-25"> 
             <Heromain />
          </div>
      </div>
    </section>
  );
};

export default Hero;
