import { Button, Input, message, Tag, Tabs } from 'antd'
import React, { useEffect, useState, useRef } from "react";
import { useChat } from './hooks/useChat'
import Title from "../components/Title.js"
import Message from '../components/Message';
import styled from 'styled-components';

//const ChatBoxesWrapper = styled(Tabs)`  
const ChatBoxesWrapper = styled.div`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { me, status, messages, sendMessage, displayStatus } = useChat()
    const [chatBoxes, setChatBoxes] = useState([]); //{label, children, key}   分頁
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('');
    const [msgSent, setMsgSent] = useState(false);

    const [body, setBody] = useState('')//??????????????????????
    const bodyRef = useRef(null)//                   ?????????
    const msgRef = useRef(null);
    const msgFooter = useRef(null);
    // useEffect(() => {
    //     console.log('useEffect');
    //     displayStatus(status)
    // }, [status])
    const displayMessage = () => (
        messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            messages.map(({ name, body }, i) => (
                <p className="App-message" key={i}>
                    <Tag color="blue">{name}</Tag> {body} key={i}
                </p>
            ))
        )
    )
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView //.current拿到(類似指標) //如果是undefine就不做事
            ({ behavior: 'smooth', block: "start" });
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]); //msgSent來triger //所以新增msgSent

    return (<>
        <Title name={me} />
        <ChatBoxesWrapper
            // onChange={(key) => {      //按tabs的時候
            //     setActiveKey(key);
            //     extractChat(key);
            // }}
            // onEdit={(targetKey, action) => {    //加tabs的時候
            //     if (action === 'add') setModalOpen(true);
            //     else if (action === 'remove') {
            //         setActiveKey(removeChatBox(targetKey, activeKey));
            //     }
            // }}
            // items={chatBoxes}  //array

        >
        {/* <ChatModal
            open={modalOpen}
            onCreate={({ name }) => {
                setActiveKey(createChatBox(name));
                extractChat(name);
                setModalOpen(false);
            }}
            onCancel={() => { setModalOpen(false); }}
        /> */}
            {displayMessage()}
            <FootRef ref={msgFooter} />
            {/* 加了一個refereance 指標msgFooter*/}
        </ChatBoxesWrapper>
        <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: 10 }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    bodyRef.current.focus()
                }
            }}
        ></Input>
        <Input.Search
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg) => {
                if (!msg || !username) {
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter a username and a message body.'
                    })
                    return
                }
                sendMessage({ name: username, body: msg })
                setMsg('')
                setMsgSent(true);
                // setBody('')
            }}
        ></Input.Search>
    </>

    )
}

export default ChatRoom;
