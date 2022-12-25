import React, { useEffect, useState } from "react";
const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const client = new WebSocket('ws://localhost:4000')
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