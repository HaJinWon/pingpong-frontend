import React from 'react';
import Message from './Message';

const MessageList = ({messages}) => {
    return (
        <div>
            {messages.map((message,index) =>{return<Message key={index}
                                             type={message.type}
                                             message={message.message}
                                             sender={message.sender}
                                             senderId={message.senderId}/>}
            
            )}
        </div>
    );
};

export default MessageList;