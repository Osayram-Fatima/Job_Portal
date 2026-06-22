import React, { useRef, useState } from "react";

const UploadCV = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file picker
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Show selected file name
      console.log("Selected file:", file);
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 relative top-10 tracking-[3px] font-bold text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
       Upload CV
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
      {fileName && (
        <p className="mt-4 text-gray-700 text-sm">Selected File: {fileName}</p>
      )}
    </div>
  );
};

export default UploadCV;
