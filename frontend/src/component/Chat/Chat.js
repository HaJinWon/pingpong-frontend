import React,{useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import InputText from './InputText';
import MessageList from './MessageList';
import * as SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";



const Chat = () => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    const {roomId} = useParams();

    
    console.log(roomId);

    const styles = {
        overflow:'auto',
        height:'700px'
        
    }

    const [messages,setMessages] = useState([]);
    // const [inputMessage,setInputMessage] = useState([]);
    /*
        여기서 채팅 내용 리스트를 받아야함
    */
   
    useEffect(async()=>{        //nav 리스트 가져오는 useEffect
        console.log("useeffect in");
        ///room/enter/{roomId}
        
        try {

            // const response2 = await fetch(`http://localhost:8080/chat/room/enter/${roomId}`, {
            //     method: 'get',
            //     mode: 'cors',                           
            //     credentials: 'include',                 
            //     cache: 'no-cache',                           
            //     headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'         
            //     },
            //     redirect: 'follow',                     
            //     referrer: 'client',                       
            //     body: null
            // }).then(
                
            // )


            const response = await fetch(`/api/chat/${roomId}`, {
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
            
            
            const jsonResult = await response.json();
            
            console.log(jsonResult);
            setMessages(jsonResult);
            
 
        }catch(err){
            console.log(err);
        }
        
    },[roomId]);   


    
    /*======================= socket,stomp 연결 ================================ */

    const roomName = 'roomName';
    //const roomId = roomId;
    const loginName = loginMember.name;
    const loginId = loginMember.id;
    console.log(roomName + ", " + roomId + ", " + loginName + ", " + loginId);

    const client = useRef({});
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      connect();
  
      return () => disconnect();
    }, []);
  
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
        setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
        setMessages([...messages,JSON.parse(body)]);
      });
    };
  
    const publish = (message) => {
      if (!client.current.connected) {
        return;
      }
  
      console.log(JSON.stringify({
        type: "TALK",
        roomId: Number(roomId),
        senderId: loginId,
        message: message,
        sender: loginName,
      }));

      client.current.publish({
        destination: "/pub/chat/message",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
          type: "TALK",
          roomId: roomId,
          senderId: loginId,
          message: message,
          sender: loginName
        })
      });
      
      setMessage("");
    };
  
    //
        
    const notifyMessage = {
        add:function(message2){
            
            console.log('Chat:',message2.message);
            //setMessages([...messages,message2]);
            //setMessage(message2);
            //publish(message2);
            //stomp.send('/pub/chat/message', {}, JSON.stringify({type:"TALK",roomId: roomId, senderId: loginId,  message: message2.message, sender: loginName}));
            //stomp.send('/pub/chat/message', {}, JSON.stringify({type:"TALK",roomId: 12, senderId: "2",  message: "test", sender: "test"}));
            
        }
    }
    
    
    /*================================================================== */
    return (
        <SiteLayout isSearch={false}>
            <div style={styles} className='chatDiv'>
                <h2>ChatPage</h2>
                <MessageList messages={messages}/>
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
                <button onClick={message !=="" ? () => publish(message):null}>send</button>
                </div>
            </div>
            {
                //<InputText roodId={roomId} notifyMessage={notifyMessage} />
            }
            
        </SiteLayout> 
    );
};

export default Chat;