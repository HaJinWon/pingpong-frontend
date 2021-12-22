import React, { useState, useRef, useEffect, useContext } from 'react';
import SockJsClient from 'react-stomp';
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { WebSocketContext } from '../Websocket/WebSocketProvider';
import styles from '../assets/scss/layout/NavTop.scss'

const NavTop = (props) => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const $websocket = useRef(null);
    const client  = useContext(WebSocketContext);
    const handlerOpenNavRight = (e) => {
        e.preventDefault()
    }

    const handlerLogOut = async (e) => {
        e.preventDefault();

        await fetch(`/api/member/logout`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'client',
            body: null
        })

        alert('로그아웃이 완료 되었습니다.');
        location.href = '/login';

    }
    const sendMessage = async () => {
        await fetch(`http://localhost:8080/wsInvite/1/10`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'client',
            body: null
        })
    }

    // useEffect(()=>{
    //     console.log('dsadsa',client);
    // },[])
    // const client = useRef({});
    // useEffect(() => {
    //     connect();

    //     return () => disconnect();
    // }, []);

    // /**
    //  *  Stomp 연결 함수
    //  */
    // const connect = () => {
    //     client.current = new StompJs.Client({
    //         webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"), // proxy를 통한 접속
    //         connectHeaders: {
    //             "auth-token": "spring-chat-auth-token",
    //         },
    //         debug: function (str) {
    //             console.log(str);
    //         },
    //         reconnectDelay: 5000,
    //         heartbeatIncoming: 4000,
    //         heartbeatOutgoing: 4000,
    //         onConnect: () => {
    //             subscribe();
    //         },
    //         onStompError: (frame) => {
    //             console.error(frame);
    //         },
    //     });

    //     client.current.activate();
    // };

    // /**
    //  *  Stomp 연결 끊는 함수
    //  */
    // const disconnect = () => {
    //     client.current.deactivate();
    // };
    // const subscribe = () => {
    //     client.current.subscribe(`/sub/${loginMember.id}`, ({ body }) => {
    //         alert(body);
    //     });
    // };

    return (
        <header className={styles.NavTop}>
            <div className={styles.Block}>
                PINGPONG
            </div>
            {
                // <SockJsClient url="http://localhost:8080/ws-stomp"
                //     topics={[`/sub/${loginMember.id}`]}
                //     onMessage={msg => { console.log(msg); alert(msg); }} ref={$websocket} />
            }
        </header>
    );
};
export default NavTop;