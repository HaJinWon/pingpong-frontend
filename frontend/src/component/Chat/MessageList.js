import React from 'react';
import Message from './Message';

const MessageList = ({ messages, roomId, callback }) => {

    const noticeCallback2 = (notice)=>{
        callback(notice);
    }
    return (
        <div>
            {messages.map((message, index) => {
                return <Message key={index}
                    type={message.type}
                    message={message.message}
                    sender={message.sender}
                    senderId={message.senderId}
                    roomId={roomId} 
                    chatId={message.chatId}
                    callback={noticeCallback2}/>
            }

            )}
        </div>
    );
};

export default MessageList;