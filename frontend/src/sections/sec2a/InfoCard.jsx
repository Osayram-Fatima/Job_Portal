import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const InfoCard = ({
  bgParent = "bg-pink-50",
  bgCard = "bg-pink-800",
  title,
  description,
  buttonText,
  path,
  imageSrc,
  onButtonClick,
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  // when file selected (click OR drop)
  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    console.log("Selected file:", file);
    alert(`CV selected: ${file.name}`);
    onButtonClick?.(file);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={`${bgParent} flex justify-center items-center`}>
      
      {/* hidden input */}
      {onButtonClick && (
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      <div
        className={`${bgCard} rounded-[4vw] h-[40vh] w-[40vw] flex items-center m-6
        hover:shadow-[0_0px_15px_white] transition-shadow duration-300`}
      >
        {/* LEFT */}
        <div className="flex-1 px-8">
          <h1 className="text-2xl font-bold text-[#183168] mb-3">{title}</h1>
          <p className="text-sm text-[#183168] mb-4">{description}</p>

          {/* 🔥 DRAG & DROP AREA (only in upload mode) */}
          {onButtonClick && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`mb-4 cursor-pointer   rounded-xl text-center transition
               `}
            >
              <p className="px-4 py-3 rounded-full bg-[#183168] text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg">
                {fileName ? `📄 ${fileName}` : "Drag & drop CV here"}
              </p>
               
            </div>
          )}

          {/* BUTTON */}
          {onButtonClick ? (
  <button
    onClick={() => fileInputRef.current.click()}
    className="  rounded-full bg-[#183168] text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
  >
    {buttonText}
  </button>
) : (
  <Link to={path}>
    <button className="px-4 py-2 rounded-full bg-[#183168] text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg">
      {buttonText}
    </button>
  </Link>
)}

        </div>

        {/* RIGHT */}
        <div className="flex-1 flex justify-center items-center">
          <img src={imageSrc} alt={title} className="max-h-[220px]" />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
