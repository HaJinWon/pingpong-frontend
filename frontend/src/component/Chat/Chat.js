import React from 'react';
import SiteLayout from '../../layout/SiteLayout';
import MessageList from './MessageList';

const Chat = () => {
    const styles ={
        overflow:'auto',
        height:'840px'
    }
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