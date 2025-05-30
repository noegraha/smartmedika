import React from 'react';
  const user = sessionStorage.getItem("userId");

const Message = (props) => (
    <div style={{
        background: props.user === user ? "#eee" : "#ddd", borderRadius: '5px',
        padding: '10px 10px', width: '50%',
        textAlign: props.user === user ? "right" : "left"
    }}>
        <p><strong>{props.user}</strong> says:</p>
        <p>{props.message}</p>
    </div>
);

export default Message;