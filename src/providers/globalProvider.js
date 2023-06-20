import React, {createContext} from 'react'

export const GlobalContext = createContext(null);

export function GlobalProvider ({children}) {
  const print = () =>{
      console.log('caca')
  }

  return(
    <GlobalContext.Provider value={{
        print
    }}>
    {children}
    </GlobalContext.Provider>
  )
};