import React from 'react'
import Content from './Content'
import Nav from './Nav'

// 1. filteredJobs ko as a prop receive karo
const Main = ({ filteredJobs }) => {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Background Layer */}
      <div className='fixed inset-0 bg-center bg-cover bg-[url("/sections/Browser/browserbg.png")] -z-20 brightness-[0.5] blur-[2px] scale-110' />

      {/* Navigation Section */}
      <header className="">
         <Nav />
      </header>

      {/* Main Content */}
      <main className="w-full relative z-10 -mt-15">
        {/* 2. Content component ko filtered data pass kar do */}
        <Content jobs={filteredJobs} />
      </main>
    </div>
  )
}

export default Main