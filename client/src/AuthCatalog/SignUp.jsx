import { useContext, useRef } from "react";


import { authContext } from "../contexts/AuthContextProvider"
import { promptContext } from "../contexts/PromptContextProvider"

import { createUser, auth } from "./firebase/firebaseUtils";

export function SignUp() {
  const { user, setUser, signUp, setSignUp } = useContext(authContext)
  const { serverAddress } = useContext(promptContext)
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);


  async function genUserID(userCredential) {
     setUser(user=> ({
          status: true,
          username: username.current.value,
          credential: userCredential.user,
          existing: false,
          }))

         fetch(`${serverAddress}/create_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.current.value,
            credential: userCredential.user
          })
        }).then(res => {
          setSignUp(false);
        }
        ).catch(err => {
          console.log(err)
        })
    }
  
  function closeSignUpWindow() {
    setSignUp(() => false)
  }


  return (
    <div className=" fixed inset-0  bg-black/50  justify-center items-center flex">
      <div className=" w-1/4 h-4/5 border borderbg-gray-600 shadow-2xl bg-white rounded-2xl">
        <div className="flex flex-col justify-center items-center w-full h-full relative">

          <div className = "flex justify-center items-center grow">
          <p className="text-gray-950  text-2xl p-3 text-center"> Get preference based suggestions! </p>
          </div>


          <p className = "text-xs mx-2  text-gray-600"> Allow us to remember your preferences! </p>
          <input ref={username} type="text" name="username" 
          className="border-2 border-gray-700 w-4/5 text-black placeholder-gray-400 rounded-2xl p-3 text-sm my-2"
           placeholder="Create a username" />

          <input ref={email} type="email" name="email" 
          className="border-2 border-gray-700 w-4/5 text-black placeholder-gray-400 rounded-2xl p-3 text-sm my-2" 
          placeholder="Enter your email" />

          <input ref={password} type="password" name="password" 
          className="border-2 border-gray-700 w-4/5 text-black placeholder-gray-400 rounded-2xl p-3 text-sm my-2" 
          placeholder="Pick a password" />

          <button type="button" onClick={() => closeSignUpWindow()} className="absolute top-2 right-2 h-10 w-10">
            <img src="icons/close-button.png" alt="close window" /></button>

          <button type="button"
            className="bg-black rounded-4xl shadow-gray-800 shadow-2xl border-2 border-gray-700 p-3 mx-2 my-1 text-white text-base cursor-pointer"
            onClick={() => createUser(email.current.value, password.current.value, genUserID)}>
            SignUp</button>
        </div>
      </div>

    </div>
  )

}
