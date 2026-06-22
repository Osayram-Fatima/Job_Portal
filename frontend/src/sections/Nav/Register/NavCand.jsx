// NavCand.jsx
import React from "react";
import CardInfo from "./CardInfo";

const NavCand = () => {
  return (
    <CardInfo
      path="/register/candidate"
      hoverShadowClass="hover:shadow-[0_20px_50px_rgba(8,112,184,0.9)]"
      bgParent="flex justify-center items-center"
      bgCard="bg-[#183168]"
      titleColor="text-white"
      descColor="text-slate-100"
      buttonBgColor="bg-white"
      buttonTextColor="text-[#183168]"
      title="For Candidates"
      description="Build your professional profile and discover new job opportunities that match your skills."
      buttonText="Register as Candidate"
      imageSrc="/sections/sec2a/Candidate.svg"
    />
  );
};

export default NavCand;
