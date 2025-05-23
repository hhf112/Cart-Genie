import { useContext } from "react";

import { authContext, promptContext } from "./Contexts";
import { useState } from "react";

import {LoginCat} from "./LoginCat.jsx"

export function AuthCatalogue() {
  const { user, setLoggedIn } = useContext(authContext);
  const { serverAddress } = useContext(promptContext);


  const [SignUp, setSignUp] = useState(false);
  const [Login, setLogin] = useState(false);



  console.log(user)
  function LoginUser() {
    setLogin(true)
    //API call and login
    // setLoggedIn({
    //     status: true,
    //     username: "harsh",
    // })
  }
  function LogOut() {
    setLogin(false)

    //Log out.
    setLoggedIn({
      status: false,
    })
  }
  return (
    <>
      <div className="fixed top-0 right-0 flex grow w-1/5 m-4 justify-center">
        {user.status ? (
          <button type="button" onClick={() => { LogOut() }}
            className="bg-black rounded-4xl  shadow-2xl shadow-black px-4 py-2 m-4 text-white text-lg cursor-pointer">Hello {user.username}!</button>
        ) : (
          <>
            <button type="button" onClick={() => { }}
              className="bg-white rounded-4xl border-2 border-b-blacks shadow shadow-gray-700 py-2 px-4 my-4 mx-2 text-black text-lg cursor-pointer">Sign Up</button>
            <button type="button" onClick={() => { LoginUser() }}
              className="bg-black rounded-4xl  shadow-2xl shadow-black border-2 border-black py-2 px-4 my-4 mx-2 text-white text-xl cursor-pointer">Login</button>
          </>
        )}
      </div>

      {Login && <LoginCat/>}
    </>
  )

}
