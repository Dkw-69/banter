import React from 'react';

const OtherUserMessage = ({lastMessage, message}) => {
        // check if it's first message from that user
        const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username
        return ( 
            <div className="message-row">
                {isFirstMessageByUser && (
                    <div
                        className="message-avatar"
                        style={{backgroundImage: `url(${message?.sender?.avatar})`}}
                    />
                )}
                {
                    // check if the message is message or img
                    message?.attachments?.length > 0
                        ? (
                            <img 
                                src={message.attachments[0].file}
                                alt="message-attachment"
                                className="message-image"
                                style={{marginLeft: isFirstMessageByUser ? '4px' : '48px'}}
                            />
                        ) : (
                            <div className="message" style={{float: 'left', fontWeight: '300', color: '#fff', backgroundColor: '#1a73e8', marginLeft: isFirstMessageByUser ? '4px' : '48px'}}>
                                {message.text}
                            </div>
                        )
                }
            </div>
         );
}
 
export default OtherUserMessage;