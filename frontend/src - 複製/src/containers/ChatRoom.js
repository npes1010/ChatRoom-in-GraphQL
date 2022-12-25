import { Button, Input, message, Tag } from 'antd'
import React, { useEffect, useState, useRef } from "react";
import {useChat} from './hooks/useChat'
import Title from "../components/Title.js"
import Message from '../components/Message';
import styled from 'styled-components';

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
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('');
    const [msgSent, setMessage] = useState(false);

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
        msgFooter.current?.scrollIntoView
            ({ behavior: 'smooth', block: "start" });
    };
    useEffect(() => {
        scrollToBottom();
        // setMsgSent(false);???????????????????????????????????????????????
    }, [msgSent]);

    return ( <>
        <Title name = {me} />
        <ChatBoxesWrapper>
            {displayMessage()}
            <FootRef ref={msgFooter} />
            {/* ??????????????????????????????????????????????????????????? */}
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
                    // setBody('')
                }}
            ></Input.Search>
        </>

    )
}

export default ChatRoom;
