import React, { createContext, useState } from "react";

export const ModalContext = createContext(null);

export function ModalProvider ({children}) {
  const [modalImgOpen, setImgOpen] = useState(false);
  const [modalVidOpen, setVidOpen] = useState(false);

  const handleCloseModal = () => {
    setImgOpen(false);
    setVidOpen(false);
    document.body.style.overflow = "";
  }

  return(
    <ModalContext.Provider value={{
      caca:handleCloseModal,
      modalImgOpen,
      modalVidOpen,
      setVidOpen,
      setImgOpen
    }}>
      {children}
    </ModalContext.Provider>
  )
}