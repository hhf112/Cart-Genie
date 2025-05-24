import { createContext, useContext } from "react";
import { useState } from "react";
import { getAuth, validatePassword } from "firebase/auth";


export const authContext = createContext();


export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    status: null,
  }); 
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  

  return (
    <authContext.Provider value={{
      user,
      setUser,
      setSignUp,
      setLogin,
      signUp,
      login,
    }}>
      {children}

    </ authContext.Provider>
  )
}
