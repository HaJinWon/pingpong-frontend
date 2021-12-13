import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import InputText from './InputText';
import MessageList from './MessageList';
import SockJS from 'sockjs-client';
//import Stomp from 'stompjs';
import {Stomp} from '@stomp/stompjs';
import StompJs from '@stomp/stompjs';


const Chat = () => {
    const loginMember = JSON.parse(window.sessionStorage.getItem("loginMember"));
    let {roomId} = useParams();

    
    console.log(roomId);

    const styles = {
        overflow:'auto',
        height:'700px'
        
    }

    const [messages,setMessages] = useState([]);
    const [inputMessage,setInputMessage] = useState([]);
    /*
        여기서 채팅 내용 리스트를 받아야함
    */
   
    useEffect(async()=>{        //nav 리스트 가져오는 useEffect
        console.log("useeffect in");
        
        try {
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

    var sockJs = new SockJS("http://localhost:8080/ws-stomp");
    var stomp = Stomp.over(sockJs);
    stomp.connect({}, function (){
        console.log("STOMP Connection");

        //4. subscribe(path, callback)으로 메세지를 받을 수 있음
        stomp.subscribe(`/sub/chat/room/${roomId}`, function (chatMessage) {
            var content = JSON.parse(chatMessage.body);

            // 글을쓴사람 (로그인한사람이 아님)
            var writer = content.sender;
            var writerId = content.senderId;

            var message = content.message;
            var type = content.type;
            var str = '';
            console.log(type);

            //setMessages([...messages,content]);
            /*
            if (type === 'ENTER') {
                printNotice(message);
            } else {
                if (writerId === loginId) {
                    printMyChat(writer, message);
                } else {
                    //printOtherChat(writer, message);
                }
            }
            */
        });
    
        // 입장메시지
        //stomp.send("/pub/chat/message", {}, JSON.stringify({type:'ENTER', roomId: roomId, senderId: loginId, sender:loginName}))
    });
        
    const notifyMessage = {
        add:function(message2){
            
            console.log('Chat:',message2.message);
            //setMessages([...messages,message]);
            //stomp.send('/pub/chat/message', {}, JSON.stringify({type:"TALK",roomId: roomId, senderId: loginId,  message: message2.message, sender: loginName}));
            stomp.send('/pub/chat/message', {}, JSON.stringify({type:"TALK",roomId: 12, senderId: "2",  message: "test", sender: "test"}));
        }
    }
    
    
    /*================================================================== */
    return (
        <SiteLayout isSearch={false}>
            <div style={styles} className='chatDiv'>
                <h2>ChatPage</h2>
                <MessageList messages={messages}/>
                
            </div>
            <InputText roodId={roomId} notifyMessage={notifyMessage} />
        </SiteLayout> 
    );
};

export default Chat;