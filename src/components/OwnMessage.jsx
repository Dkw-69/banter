import React from 'react';

const OwnMessage = ({message}) => {
    // check if the message is message or img using optional chaining
    if(message?.attachments?.length > 0){
        return(
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{float: 'right'}}
            />
        )
    }
    return ( 
        <div className="message" style={{float: 'right', fontWeight: '300', marginRight: '18px', color: '#fff', backgroundColor: '#242c37'}}>
            {message.text}
        </div>
     );
}
 
 
export default OwnMessage;