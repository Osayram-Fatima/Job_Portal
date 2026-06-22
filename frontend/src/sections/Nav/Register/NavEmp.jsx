import React from "react";
import CardInfo from "./CardInfo";
const NavEmp = () => {
  return (
    <CardInfo
      path="/register/company"
      hoverShadowClass="hover:shadow-[0_20px_50px_rgba(8,112,184,0.7)]"
      bgParent="flex justify-center items-center "
      bgCard="bg-[#b1d6ef]"
      titleColor="text-[#183168]"
      descColor="text-[#183168]"
      buttonBgColor="bg-[#183168]"
      buttonTextColor="text-white"
      title="For Companys"
      description="Find professional from around the world and across all skills"
      buttonText="Register as Company"
      imageSrc="/sections/sec2a/employee.svg"
    />
  );
};

export default NavEmp;
