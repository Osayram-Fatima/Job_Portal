import React from 'react'
import JobMain from './browsejobs/Main'
import Main from './browsenavbar/Main'
 const Browse = () => {
 
  // Agar search se data aya hai toh wo results lega, warna khali array
   return (
<div>
  
  <div>
    <Main />
  </div>
  <div>
    <JobMain />
  </div>
</div>
)
}

export default Browse