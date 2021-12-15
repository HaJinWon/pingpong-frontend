import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import SiteLayout from "../../layout/SiteLayout";
import MessageList from "./MessageList";
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import Notice from "./Notice";
const Chat = () => {

    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const { roomId } = useParams();
    const [notice, setNotice] = useState('');

    const styles = {
        overflow: "auto",
        height: "700px",
        display:"flex",
        flexDirection: "column-reverse" ,
        overflowY:"auto"
    
    };

    const [messages, setMessages] = useState([]);

    //roomId방의 채팅 내역을 받아오는 api
    useEffect(async () => {

        console.log("useeffect in");

        try {

            const response = await fetch(`/api/chat/${roomId}`, {
                method: "get",
                mode: "cors",
                credentials: "include",
                cache: "no-cache",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "client",
                body: null,
            });

            const jsonResult = await response.json();

            console.log(jsonResult);
            setMessages(jsonResult);
        } catch (err) {
            console.log(err);
        }
    }, [roomId]);

    /*======================= socket,stomp 연결 ================================ */

    const roomName = "roomName";
    const loginName = loginMember.name;
    const loginId = loginMember.id;
    console.log(roomName + ", " + roomId + ", " + loginName + ", " + loginId);

    const client = useRef({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        connect();

        return () => disconnect();
    }, [roomId]);

    const connect = () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"), // proxy를 통한 접속
            connectHeaders: {
                "auth-token": "spring-chat-auth-token",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                subscribe();
                publish(message, "ENTER");
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });

        client.current.activate();
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const subscribe = () => {
        client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
            //setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
            //console.log('body',body);
            setMessages(messages=>[...messages, JSON.parse(body)]);
            console.log(messages);
            console.log("subscribe 실행");
        });
    };

    const publish = (message, type) => {
        if (!client.current.connected) {
            return;
        }

        client.current.publish({
            destination: "/pub/chat/message",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: type,
                roomId: roomId,
                senderId: loginId,
                message: message,
                sender: loginName,
            }),
        });

        setMessage("");
    };

    //공지사항 바꾸기 위한 콜백
    const noticeCallback = (notice) =>{
        setNotice(notice);
        publish('공지사항이 등록되었습니다.','TALK');

    }

    /*================================================================== */
    return (
        <SiteLayout isSearch={false}>
                <h2>ChatPage</h2>
                <Notice roomId={roomId}/>
            <div style={styles} className="chatDiv">            
                <MessageList messages={messages} roomId={roomId} callback={noticeCallback}/>
            </div>
            <div>
                <div>
                    <input
                        type={"text"}
                        placeholder={"message"}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.which === 13 && publish(message)}
                    />
                    <button
                        onClick={message !== "" ? () => publish(message, "TALK") : null}
                    >
                        send
                    </button>
                </div>
            </div>
        </SiteLayout>
    );
};

export default Chat;