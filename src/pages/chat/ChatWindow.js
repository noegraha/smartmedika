import React from 'react';

import Message from './Message';

const ChatWindow = (props) => {
    const tampilpesan = props.chat
        .map(m => <Message
            key={Date.now() * Math.random()}
            clientid={m.fromUserId}
            user={m.fromUserId}
            message={m.message} />);

    return (
        <div>
            {tampilpesan}
        </div>
    )
};

export default ChatWindow;