import React from "react";


const Bg = () => {
  return (
    <div className='w-full flex flex-col'>
        {/* Light area jahan cards shuru hotay hain */}
        <div className='h-[45vh] bg-[#f0f5fa]'></div> 
        {/* Dark area ko lamba kar do takay ye niche tak jaye */}
        <div className='min-h-[55vh] bg-[#011d5a]'></div>
    </div>
  )
}

export default Bg;
