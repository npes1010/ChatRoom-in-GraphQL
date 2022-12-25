import React, { useEffect, useState } from "react";
import { Button, Input, message, Tag } from 'antd'
import { useContext } from 'react';
import { createContext } from 'react';
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => { },
    // clearMessages: () => { },/////////////////////////////////先緩
});
const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
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
    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload
            const content = {
                content: msg, duration: 0.5
            }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }
    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);//??????????????????????????????????????
    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn,
                sendMessage, displayStatus///////////////////////////////////, clearMessages
            }}
            {...props}
        />
    );
};
// return {
//     status, messages, sendMessage, me, setMe, setSignedIn, displayStatus//return出去的是object
// };

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };