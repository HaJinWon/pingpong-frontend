import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import InputText from './InputText';
import MessageList from './MessageList';

const Chat = () => {

    let {roomId} = useParams();
    console.log(roomId);
    const styles ={
        overflow:'auto',
        height:'700px'
        
    }

    const [messages,setMessages] = useState([]);
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

    return (
        <SiteLayout isSearch={false}>
            <div style={styles}>
                <h2>ChatPage</h2>
                <MessageList messages={messages}/>
                
            </div>
            <InputText roodId={roomId}/>
        </SiteLayout> 
    );
};

export default Chat;