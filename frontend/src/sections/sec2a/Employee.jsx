import React from 'react'
import InfoCard from './InfoCard';  

const Employee = () => {
  return (
    <InfoCard
      bgParent=""
      bgCard="bg-white"
      title="For Employers"
      description="Find professional from around the world and across all skills"
      buttonText="Post jobs for Free"
      path="/post-job"
      imageSrc="/sections/sec2a/employee.svg"
    />
  );
}

export default Employee