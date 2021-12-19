
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import SiteLayout from "../../layout/SiteLayout";
import MessageList from "./MessageList";
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import Notice from "./Notice";
import MessageInput from '../../assets/css/MessageInput.css';
import Button from 'react-bootstrap/Button';
import ParticipantList from './ParticipantList';

const Chat = () => {

    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));

    const { roomId } = useParams();
    const [notice, setNotice] = useState('');
    const [participant, setParticipant] = useState([]);
    const [messages, setMessages] = useState([]);
    const dateNow = new Date();

    const styles = {
        overflow: "auto",
        height: "700px",
        display:"flex",
        flexDirection: "column-reverse" ,
        overflowY:"auto",
        backgroundColor:'#b2c9ed'
    };



    useEffect(async () => {

        try {
                /**
                 * 채팅방 채팅 내역 리스트 불러오는 함수
                 */
            const response = await fetch(`/api/chat/${roomId}`, {
                method: "get",
                mode: "cors",
                credentials: "include",
                cache: "no-cache",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "client",
                body: null,
            });

            const jsonResult = await response.json();
            console.log(jsonResult);
            setMessages(jsonResult);


            /**
             *  채팅방 참여자 리스트
             */
             const response2 = await fetch(`/api/room/participant/${roomId}`, {
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

            const jsonResult2 = await response2.json();
            console.log('참여자리스트',jsonResult2.data);
            setParticipant(jsonResult2.data);

        } catch (err) {

            console.log(err);
        }
    }, [roomId]);

    /*======================= socket,stomp 연결 ================================ */

    const roomName = "roomName";
    const loginName = loginMember.name;
    const loginId = loginMember.id;


    const client = useRef({});
    const [message, setMessage] = useState("");

    /**
     *  룸 ID 변경 시 실행되는 함수 (Stomp,socket 연결)
     */ 
    useEffect(() => {
        connect();

        return () => disconnect();
    }, [roomId]);

    /**
     *  Stomp 연결 함수
     */
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

    /**
     *  Stomp 연결 끊는 함수
     */
    const disconnect = () => {
        client.current.deactivate();
    };

    /**
     *  Stomp Subscribe 함수
     */
    const subscribe = () => {
        client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
            setMessages(messages=>[...messages, JSON.parse(body)]);

        });
    };

    /**
     *  Stomp Publish 함수
     */
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
            
            <Notice roomId={roomId} participant={participant}/>
            <div style={styles} className="chatDiv">   
                       
                <MessageList messages={messages} roomId={roomId} callback={noticeCallback}/>
            </div>
            <div>
                <div>
                    <input
                        className={MessageInput.TextBox}
                        type="text"
                        placeholder="메세지를 입력해주세요."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.target.value !=='' &&e.which === 13 && publish(message)}
                    />
                    <Button className={MessageInput.Button}
                        onClick={message !== "" ? () => publish(message, "TALK") : null}
                    >
                        전송
                    </Button>
                </div>
            </div>
        </SiteLayout>

    );
};

export default Chat;