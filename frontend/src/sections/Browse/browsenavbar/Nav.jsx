import React from 'react'
import Upnav from './Upnav'
import Catnav from './Catnav'
import { Outlet } from 'react-router-dom' // Ye add karo

const Nav = () => {
  return (
    <div>
      <header className="w-full flex flex-col items-center relative z-50">
        <Upnav />
        <div className="w-full z-40 mt-18"> 
          <Catnav />
        </div>
      </header>
      
       <main className="w-full "> 
        <Outlet /> 
      </main>
      
    </div>
  )
}

export default Nav