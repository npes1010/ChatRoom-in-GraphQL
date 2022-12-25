import React, { useEffect, useState } from "react";
const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const client = new WebSocket('ws://localhost:4000')
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                setMessages(payload);//讓對話一開始就顯示
                break;
            }
            case "output": {
                setMessages(() =>
                    [...messages, ...payload]); break;
            }
            case "status": {
                setStatus(payload); break;
            }//Received from server
            // case "cleared": {
            //     setMessages([]);
            //     break;
            // }
            default: break;
        }
    }


    const sendData = async (data) => {
        await client.send(
            JSON.stringify(data));
    };
    // const sendMessage = (msg) => {
    //     setMessages([...messages, msg]);
    //     setStatus({
    //         type: "success",
    //         msg: "Message sent."
    //     });
    //     console.log(msg);
    // }
    const sendMessage = (payload) => {
        sendData(["input", payload]);
        // ... // update messages and status
        console.log(payload);
    }
    return {
        status, messages, sendMessage
    };
};
export default useChat;