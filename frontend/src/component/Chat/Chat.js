import React from 'react';
import { useParams } from 'react-router';
import SiteLayout from '../../layout/SiteLayout';
import MessageList from './MessageList';

const Chat = () => {

    let {roomId} = useParams();
    console.log(roomId);
    const styles ={
        overflow:'auto',
        height:'840px'
    }

    /*
        여기서 채팅 내용 리스트를 받아야함
    */

    return (
        <SiteLayout>
            <div style={styles}>
                <h2>ChatPage</h2>
                <MessageList/>
            </div>
        </SiteLayout> 
    );
};

export default Chat;