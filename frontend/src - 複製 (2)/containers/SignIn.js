import AppTitle from "../components/Title";
import LogIn from "../components/LogIn"
import {useChat} from "./hooks/useChat"

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();//接usechat 傳過來的object
    const handleLogin = (name) => {
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
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}
export default SignIn;