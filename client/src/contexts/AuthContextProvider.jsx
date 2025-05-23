import { createContext, useContext } from "react";
import { useState } from "react";

export const authContext = useContext();

export function AuthContextProvider({ children }) {
  const [user, setLoggedIn] = useState({
    status: null,
  }); //userAuth will be added soon.

  return (
    <authContext.Provider value={{
      user,
      setLoggedIn,

    }}>
      {children}

    </ authContext.Provider>
  )
}
