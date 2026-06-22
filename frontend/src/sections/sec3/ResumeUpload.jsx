import React, { useRef, useState } from "react";

const ResumeUpload = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF or DOCX files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be under 2MB");
      return;
    }

    setFileName(file.name);
  };

  return (
    <div className="flex flex-col gap-2 w-fit">
      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Button */}
     <button
  onClick={handleClick}
  className={`
    mt-6 px-8 py-3 w-44
    rounded-full
    text-base font-semibold tracking-wide
    border border-blue-400/30
    transition-all duration-500 ease-out
    ${fileName 
      ? "bg-green-500 text-white shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)]" 
      : "bg-[#183168] text-white hover:shadow-[0_10px_25px_rgba(24,49,104,0.35)] hover:-translate-y-0.5"
    }
  `}
>
  {fileName ? "UPLOADED" : "RESUME"}
</button>


      {/* File Name */}
      {fileName && (
        <span className="text-sm text-[#183168cc]">
          {fileName}
        </span>
      )}

      {/* Error */}
      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default ResumeUpload;
