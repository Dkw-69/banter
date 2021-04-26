import React, { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine'
import { SendOutlined, PictureOutlined } from '@ant-design/icons'


const MessageForm = (props) => {

    const [value, setValue] = useState('')
    // destructure some props
    const { chatId, creds } = props
    
    // handle submit fn
    const handleSubmit = (e) => {
        e.preventDefault()
        // remove white space from texts
        const text = value.trim()
        // if there is a text, send message
        if(text.length > 0) sendMessage(creds, chatId, {text})
        // clear input form
        setValue('')
    }

    // handle change fn
    const handleChange = (e) => {
        // target the input value
        setValue(e.target.value)
        isTyping(props, chatId)
    }

    // handle image upload fn
    const handleUpload = (e) => {
        sendMessage(creds, chatId, {files: e.target.files, text: ''})
    }

    return ( 
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className="message-input"
                placeholder="Send a message"
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{display: 'none'}}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
     );
}
 
export default MessageForm;