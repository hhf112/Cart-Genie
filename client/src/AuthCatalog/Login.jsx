import { useContext, useRef } from "react";


import {authContext} from "../contexts/AuthContextProvider"
import { existingSignIn } from "./firebase/firebaseUtils.js";

export function Login() {

  const { user, login, setLogin, setUser } = useContext(authContext)
    console.log(user);
  const email = useRef(null);
  const password = useRef(null)

  function closeLoginWindow() {
    setLogin(()=> false)
  }

  function setPreferentialResponse(userCredential) {
    
    // setUser(user=> ({
    //       status: true,
    //       username: username.current.value,
    //       credential: userCredential.user,
    //       existing: true,
    //       }))

          setLogin(() => false);
  }
  
  
  return (
    <div className=" fixed inset-0  bg-black/50  justify-center items-center flex">
          <div className=" w-1/4 h-4/5 border borderbg-gray-600 shadow-2xl bg-white rounded-2xl">
            <div className="flex flex-col justify-center items-center w-full h-full relative">
    
              <div className = "flex flex-col justify-center items-center grow ">
                <p className="text-gray-950  text-2xl p-3 text-center"> Shop with Efficiency! </p>
                
              </div>
    

              <p className = "text-xs mx-2  text-gray-600"> Welcome back to Cart Genie! </p>
              
    
              <input ref={email} type="email" name="email" 
              className="border-2 border-gray-700 w-4/5 text-black placeholder-gray-400 rounded-2xl p-3 text-sm my-2" 
              placeholder="Your email" />
    
              <input ref={password} type="password" name="password" 
              className="border-2 border-gray-700 w-4/5 text-black placeholder-gray-400 rounded-2xl p-3 text-sm my-2" 
              placeholder="Your password" />
    
              <button type="button" onClick={() => closeLoginWindow()} className="absolute top-2 right-2 h-10 w-10">
                <img src="icons/close-button.png" alt="close window" /></button>
    
              <button type="button"
                className="bg-black rounded-4xl shadow-gray-800 shadow-2xl border-2 border-gray-700 p-3 mx-2 my-1 text-white text-base cursor-pointer"
                onClick={() => {existingSignIn(email.current.value, password.current.value, setPreferentialResponse)}}>
                Login</button>
            </div>
          </div>
    
        </div>
  )

}
