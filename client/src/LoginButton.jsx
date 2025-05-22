import { useContext } from "react";

import { authContext } from "./Contexts";

export function LoginButton() {
    const {loggedIn} = useContext(authContext);

    return (
        <div>
            <button type = "button" className = "rounded-3xl bg-black text-white font-mono shadow-3xl p-4"> Login </button>
        </div>
    )
}