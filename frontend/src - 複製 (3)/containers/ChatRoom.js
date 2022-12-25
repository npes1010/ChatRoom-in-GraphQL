import { Button, Input, message, Tag, Tabs } from 'antd'
import React, { useEffect, useState, useRef } from "react";
import { useChat } from './hooks/useChat'
import Title from "../components/Title.js"
import Message from '../components/Message';
import styled from 'styled-components';
import ChatModal from '../components/ChatModal';
//const ChatBoxesWrapper = styled.div`
const ChatBoxesWrapper = styled(Tabs)`  
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { me, messages, sendMessage, displayStatus } = useChat()
    const [chatBoxes, setChatBoxes] = useState([]); //{label, children, key}   分頁
    const [activeKey, setActiveKey] = useState(''); //分頁
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('');
    const [msgSent, setMsgSent] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);//分頁
    const [body, setBody] = useState('')//??????????????????????
    const bodyRef = useRef(null)//                   ?????????
    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    const renderChat = (chat) => (chat.map(({ name, body }, i) => (
        <Message isMe = { name==me?true:false} message = {body}>
            <p className="App-message" key={i}>
                <Tag color="blue">{name}</Tag> {body}
            </p>
        </Message>

    ))); // 產⽣ chat 的 DOM nodes///////////////////////////
    const extractChat = (friend) => {
        // console.log("chatBoxes=",chatBoxes);
        // const chatt = renderChat(messages.filter(({ name, body }) => ((name === friend) || (name === me))));
        // setChatBoxes([...chatBoxes,chatt]);
        // console.log("messages是",messages);
        // console.log("name="," friend=",friend );
        // console.log("renderChat回來的是=",renderChat(messages.filter(({ name, body }) => ((name === friend) || (name === me)))));
        return renderChat
            (messages.filter
                (({ name, body }) => ((name === friend) || (name === me))));
    }

    // useEffect(() => {
    //     console.log('useEffect');
    //     displayStatus(status)
    // }, [status])
    const displayMessage = () => (
            <div className="App-messages" abc = "123">{
            messages.length === 0 ? (
                <p style={{ color: '#ccc' }}> No messages... </p>
            ) : (
                messages.map(({ name, body }, i) => (
                    <p className="App-message" key={i}>
                        <Tag color="blue">{name}</Tag> {body} key={i}
                    </p>
                ))
            )
            }</div>
    )
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView //.current拿到(類似指標) //如果是undefine就不做事
            ({ behavior: 'smooth', block: "start" });
    };

    const removeChatBox =
        (targetKey, activeKey) => {
            const index = chatBoxes.findIndex
                (({ key }) => key === activeKey);
            const newChatBoxes = chatBoxes
                .filter(({ key }) =>
                    key !== targetKey);
            setChatBoxes(newChatBoxes);
            return activeKey ? activeKey === targetKey ? index === 0 ? '' : chatBoxes[index - 1].key : activeKey : '';
        };
    const createChatBox = (friend) => {
        if (chatBoxes.some
            (({ key }) => key === friend)) {
            throw new Error(friend +
                "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        console.log("createChatBox裡的",chat);
        setChatBoxes([...chatBoxes,
        {
            label: friend, children: chat,
            key: friend
        }]);
        console.log('createChatBox裡面',chatBoxes);
        setMsgSent(true);
        return friend;
    };

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]); //msgSent來triger //所以新增msgSent

    return (<>
        <Title name={me} />
        <>
            <ChatBoxesWrapper
                tabBarStyle={{ height: '36px' }}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {      //按tabs的時候
                    console.log("key是", key);
                    setActiveKey(key);
                    console.log("chatBoxes是",chatBoxes);
                    console.log("messages是= ",messages)
                    // extractChat(key);
                    //startChat(me,key);
                }}
                onEdit={(targetKey, action) => {    //加tabs的時候
                    if (action === 'add') {
                        setModalOpen(true);
                        console.log("modalOpen=", modalOpen);
                        console.log('這邊action === add');
                    }
                    else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                items={chatBoxes}  //array
            >

                {/* 加了一個refereance 指標msgFooter*/}
                {/* ///////////////////////////////////// */}
            </ChatBoxesWrapper>
            {/* {Message(activeKey, messages)} */}
            {/* {displayMessage()} */}
            {/* <FootRef ref={msgFooter} /> */}
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
        </>
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
                    <ChatModal
                open={modalOpen}
                onCreate={({ name }) => {
                    console.log('有進來')
                    setActiveKey(createChatBox(name));
                    extractChat(name);
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false); }}
            />
    </>

    )
}

export default ChatRoom;
