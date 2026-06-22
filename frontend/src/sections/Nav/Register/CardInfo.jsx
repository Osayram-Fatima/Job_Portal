import React from "react";

const CardInfo = ({
  // ... baki props same hain
  path = "/", // Naya prop path define karne ke liye
  buttonText,
  buttonBgColor,
  buttonTextColor,
  // ... baki destructuring
  ...props 
}) => {
  
  // Link open karne ka function
  const handleRegisterClick = () => {
    window.open(path, "_blank", "noopener,noreferrer"); 
    // _blank se naya tab khulega
  };

  return (
    <div className={`${props.bgParent} flex flex-row justify-center items-center`}>
      <div className={`${props.bgCard} ${props.hoverShadowClass} rounded-[4vw] h-[50vh] w-[40vw] flex flex-row justify-center items-center m-6 transition-all duration-500`}>
        <div className="flex-1 px-8 z-10">
          <h1 className={`text-2xl font-bold mb-3 ${props.titleColor}`}>{props.title}</h1>
          <p className={`text-sm mb-4 ${props.descColor}`}>{props.description}</p>
          
          {/* Button updated with onClick */}
          <button
            onClick={handleRegisterClick}
            className={`px-4 py-2 rounded-full text-sm font-semibold
            hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all
            ${buttonBgColor} ${buttonTextColor}`}
          >
            {buttonText}
          </button>
        </div>

        <div className="flex-1 flex justify-center items-center relative h-full">
          <div className="absolute w-40 h-40 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl"></div>
          <img src={props.imageSrc} alt={props.title} className="max-h-[220px] z-10 drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;