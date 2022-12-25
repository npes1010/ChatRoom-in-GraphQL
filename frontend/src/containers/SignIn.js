import AppTitle from "../components/Title";
import LogIn from "../components/LogIn"
import {useChat} from "./hooks/useChat"
import React, { useEffect, useState } from "react";

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();//接usechat 傳過來的object
    const [temp, setTemp ] = useState('')
    const handleLogin = (name) => {
        setMe(temp)
        console.log(name)
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
    }
    return (
        <>
            <AppTitle />
            <LogIn me={temp} setName={setTemp} onLogin={handleLogin} />
        </>
    );
}
export default SignIn;