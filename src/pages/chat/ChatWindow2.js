import React from 'react';

import Message from './Message';

const ChatWindow2 = (props) => {
    const tampilpesanbalas = props.chat
        .map(m => <Message
            key={Date.now() * Math.random()}
            clientid={m.fromUserId}
            user={m.fromUserId}
            message={m.message} />);

    return (
        <div>
            {tampilpesanbalas}
        </div>
    )
};

export default ChatWindow2;