'use client'

import React, { useState } from 'react'
import { NavbarStateProps } from './interface'
import { Drawer } from './Drawer'
import { NavbarNormal } from './NavbarNormal'

export const Navbar: React.FC = () => {
  const [navbarState, setNavbarState] = useState<NavbarStateProps>({
    isClicked: false,
    isOpen: false,
  })

  const handleClicked = () => {
    setNavbarState({ ...navbarState, isClicked: !navbarState.isClicked })
  }

  const handleUserProfile = (bool: boolean) => {
    setNavbarState({ ...navbarState, isOpen: bool })
  }

  const closeNavbar = () => {
    setNavbarState({ ...navbarState, isClicked: false })
  }

  return (
    <>
      <div className="fixed w-full z-[60] bg-white">
        <NavbarNormal
          {...navbarState}
          handleClicked={handleClicked}
          handleUserProfile={(bool: boolean) => handleUserProfile(bool)}
          isDevelopment={process.env.NEXT_PUBLIC_DEVELOPMENT !== 'false'}
        />
        <Drawer
          {...navbarState}
          handleUserProfile={(bool: boolean) => handleUserProfile(bool)}
          closeNavbar={closeNavbar}
        />
      </div>
    </>
  )
}