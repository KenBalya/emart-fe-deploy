export interface NavbarStateProps {
    isClicked: boolean
    isOpen: boolean
  }
  
  export interface DrawerProps extends NavbarStateProps {
    handleUserProfile: (bool: boolean) => void
    closeNavbar: () => void
  }
  
  export interface NavbarProps {
    isDevelopment: boolean
    handleUserProfile: (bool: boolean) => void
    handleClicked: () => void
  }