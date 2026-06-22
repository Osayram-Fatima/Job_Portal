import React from 'react'
import Secmain from './Secmain'
import Bg from './Bg'
import Header from './Header'

const Section2b = () => {
  return (
    <section id="categories-section" className="relative h-[84vh] ">
      
      {/*BACKGROUND  */}
      <div className='absolute inset-0 -z-10' >
        <Bg />
      </div>
    <div>
        <Header />

    </div>

      <div className="relative z-10">
         <Secmain />
      </div>
      
    </section>
  )
}

export default Section2b