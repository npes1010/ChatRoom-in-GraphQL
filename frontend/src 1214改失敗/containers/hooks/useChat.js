import React, { useEffect, useState } from "react";
import { Button, Input, message, Tag } from 'antd'
import { useContext } from 'react';
import { createContext } from 'react';
import Message from "../../components/Message";
import { useQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, MESSAGE_SUBSCRIPTION,CREATE_MESSAGE_MUTATION } from "../../graphql";
import { shouldCanonizeResults } from "@apollo/client/cache/inmemory/helpers";
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const ChatContext = createContext({
    status: {},
    me: "",
    friend:"",//新加的
    signedIn: false,
    messages: [],
    sendMessage: () => { },
    startChat: () => { },
    // clearMessages: () => { },/////////////////////////////////先緩y
});
const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [friend,setFriend] = useState(''); //我加的
    const [signedIn, setSignedIn] = useState(false);
    const client = new WebSocket('ws://localhost:5000')
    const [NewstartChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [New_CREATE_MESSAGE] = useMutation(CREATE_MESSAGE_MUTATION);
    
    const { data, loading, subscribeToMore }= useQuery(CHATBOX_QUERY, {
            variables: {
                name1: me,
                name2: friend,
            },
        });
    useEffect(() => {
        try {
            setMessages(data.chatbox.messages)
            console.log("標準的",data.chatbox.messages)
        }catch (e) { }
    }, [data]);
    useEffect(() => {
        try {
            console.log("??????????????????????????????????????????????");
            console.log("data=",data);
            console.log("subscribeToMore=",subscribeToMore)
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    console.log("prev=",prev.chatbox.messages)
                    const newMessage = subscriptionData.data.message;
                    console.log("不標準的",[...prev.chatbox.messages, newMessage])
                    // setMessages([...prev.chatbox.messages, newMessage])
                    // console.log("newMessage=",newMessage)
                    // console.log("messages=",messages)
                    // setMessages([...prev.chatbox.messages, newMessage])
                    // console.log("[...prev.chatbox.messages, newMessage]=",[...prev.chatbox.messages, newMessage])
                    // console.log("messages=",messages)
                    return {
                        ...prev,
                            messages: [...prev.chatbox.messages, newMessage]
                        ,
                    };
                },
            });
        } catch (e) { }
    }, [subscribeToMore]);
// client.onmessage = (byteString) => {
//     const { data } = byteString;
//     const [task, payload] = JSON.parse(data);
//     switch (task) {
//         case "init": {
//             setMessages(payload);//讓對話一開始就顯示
//             break;
//         }
//         case "output": {
//             setMessages(() =>
//                 [...messages, ...payload]); break;
//         }
//         case "status": {
//             setStatus(payload); break;
//         }//Received from server
//         // case "cleared": {
//         //     setMessages([]);
//         //     break;
//         // }
//         default: break;
//     }
// }

const startChat = (name, to) => {  //新開或按分頁
    if (!name || !to) throw new Error('Name or to required');
    // console.log('前端startChat');
    // console.log("subscribeToMore=",subscribeToMore)
    // console.log("loading=",loading)
    console.log("data=",data)
    // console.log("me=",me)
    // console.log("messages=",messages)
    NewstartChat(
        {
            variables: { name1: name, name2: to }
        }
    );
};

// const sendData = async (data) => {
//     await client.send(
//         JSON.stringify(data));
// };

const sendMessage = (props) => {
    console.log("有sendMessage")
    console.log("name=",props.name)
    console.log("to=",props.to)
    console.log("body=",props.body)
    console.log("friend=",friend)
    if (!props.name || !props.to || !props.body)
        throw new Error('name or to or body required.');
    console.log("有sendMessage")
    New_CREATE_MESSAGE({
        variables: { name1:props.name , name2: props.to,name3: props.body}
    })
    // sendData({
    //     type: "Message",
    //     payload: { name, to, body }
    // });
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
            status, me, signedIn, messages, setMe, setSignedIn,loading,friend,setFriend,
            sendMessage, displayStatus, startChat///////////////////////////////////, clearMessages
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