import { useContext } from "react";

import { authContext } from "./Contexts.jsx"

export function LoginCat() {
  const { user } = useContext(authContext)

  return (
    <div className=" fixed inset-0  bg-black/50  flex justify-center items-center">
      <div className="fixed w-1/4 h-1/2 border borderbg-gray-600 shadow-2xl bg-white rounded-4xl">
        <div className="flex flex-col justify-center items-center w-full h-full relative">
          <input type="text" className="border-2 border-black w-4/5 rounded-3xl p-2 text-lg" placeholder="something" />

        </div>
      </div>

    </div>
  )

}
