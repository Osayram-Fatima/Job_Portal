import React from "react";
import InfoCard from "./InfoCard";

const Candidate = () => {
  const handleUploadCV = (file) => {
    console.log("CV file received:", file);

    // Example: backend ke liye ready
    const formData = new FormData();
    formData.append("cv", file);

    // Ab yahan tum:
    // axios.post(...)
    // fetch(...)
    // ya future backend call kar sakti ho

    alert(`CV ready to upload: ${file.name}`);
  };

  return (
    <InfoCard
      bgParent=" "
      bgCard="bg-white"
      title="For Candidates"
      description="Build your professional profile and find new job opportunities ."
      
      imageSrc="/sections/sec2a/Candidate.svg"
      onButtonClick={handleUploadCV} // Yeh prop file upload trigger karega
    />
  );
};

export default Candidate;
