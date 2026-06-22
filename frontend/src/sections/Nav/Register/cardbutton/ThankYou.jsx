import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';  
const ThankYou = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '20px' 
    }}>
      {/* Container to control the size */}
      <div style={{ width: '500px', height: '500px' }}>
        <DotLottieReact
          src="https://lottie.host/136a2bef-b303-4e0b-a450-746c4e7ef927/VIHZw8NZT5.lottie"
          loop
          autoplay
        />
      </div>

      {/* Your new Explore Button */}
     <button 
  onClick={() => console.log("Let's explore!")}
  className="relative px-10 py-3 bottom-20 text-lg font-black tracking-tighter text-white uppercase transition-all duration-500 rounded-full cursor-pointer group hover:scale-110 active:scale-95"
>
    
  {/* The Glassy Overlay to give it that 'Playboy' shine */}
  <span className="absolute inset-0 w-full h-full bg-[#183168]/100 rounded-full border border-white/20"></span>

  {/* The Actual Button Face */}
  <Link to="/browser"><span className="relative z-10 flex items-center justify-center gap-3">
    EXPLORE 
   </span></Link>
</button>
    </div>
  );
};

export default ThankYou;