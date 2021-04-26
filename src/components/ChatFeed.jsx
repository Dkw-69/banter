import React from 'react';
import { LogoutOutlined } from '@ant-design/icons'
import MessageForm from './MessageForm'
import OwnMessage from './OwnMessage'
import OtherUsersMessage from './OtherUsersMessage'

const ChatFeed = (props) => {
    // destructure all the props I will use in the chat feed
    const { chats, activeChat, userName, messages } = props
    // get current chat if exists
    const chat = chats && chats[activeChat]
    
    // display read receipts fn
    const renderReadReceipts = (message, isMyMessage) => {
        // map through people who've read the message
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

    // generate messages fn
    const renderMessages = () => {
        // get all messages
        const keys = Object.keys(messages)
        return keys.map((key, index) => {
            // get specific message
            const message = messages[key]
            // check if it's last message sent
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            // check if message is from me
            const isOwnMessage = userName === message.sender.username

            return(
                <div key={`msg_${index}`} style={{width: '100%'}}>
                    <div className="message-block">
                        {
                            isOwnMessage 
                            ? <OwnMessage message={message} /> 
                            : <OtherUsersMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isOwnMessage ? '18px' : '0px', marginLeft: isOwnMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isOwnMessage)}
                    </div>
                </div>
            )
        })
    }
    
    // check if there are chats first
    if(!chat) return 'Loading ...'

    return ( 
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
                <button className="logout-btn" onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                }}><LogoutOutlined className="logout-icon" /></button>
            </div>
            {renderMessages()}
            <div style={{height: '100px'}}/>
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
     );
}
 
export default ChatFeed;