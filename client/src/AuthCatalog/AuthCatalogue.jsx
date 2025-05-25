import { useContext } from "react";

import { Login } from "./Login.jsx"
import { SignUp } from "./SignUp.jsx"

import { authContext } from "../contexts/AuthContextProvider.jsx";
import { promptContext } from "../contexts/PromptContextProvider.jsx";

import { logOut } from "./firebase/firebaseUtils.js";

export function AuthCatalogue() {
  
  const { user, setUser, signUp, setSignUp, login, setLogin} = useContext(authContext);
  const { serverAddress } = useContext(promptContext);

console.log(login);
  function LoginUser() {
    setLogin((prev) => "true")
  }

  function afterLogOut() {
    setLogin((prev) => "false")

    setUser({
      status: null,
    })
  }

  return (
    <>
      <div className="fixed top-0 right-0 flex grow w-1/5 m-4 justify-center">
        {user.status ? (
          <button type="button" onClick={() => logOut(afterLogOut)}
            className="bg-black rounded-4xl  shadow-2xl shadow-black px-4 py-2 m-4 text-white text-lg cursor-pointer">Hello {user.username}!</button>
        ) : (
          <>
            <button type="button" onClick={() => { setSignUp(true) }}
              className="bg-white rounded-4xl border-2 border-b-blacks shadow shadow-gray-700 py-2 px-4 my-4 mx-2 text-black text-lg cursor-pointer">Sign Up</button>
            <button type="button" onClick={() => { LoginUser() }}
              className="bg-black rounded-4xl  shadow-2xl shadow-black border-2 border-black py-2 px-4 my-4 mx-2 text-white text-xl cursor-pointer">Login</button>
          </>
        )}
      </div>

      {login !==  "false" && <Login />}
      {signUp && <SignUp />}
    </>
  )

}
