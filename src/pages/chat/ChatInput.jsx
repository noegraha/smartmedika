import { Button, Card, Input } from "antd";
import React, { useContext } from "react";
import { LoginContext } from "../rawatjalan/context";
import { ChatContext } from "./Chatcontext";

const ChatInput = (props) => {
  const { namauser } = useContext(LoginContext);
  const { sendMessageUser, id, isimessage, setIsiMessage, insertChat } =
    useContext(ChatContext);
  // const [pesan, setPesan] = useState(null)
  const user = sessionStorage.getItem("userId");

  // const user = namauser;
  const pesan = {
    userId: id,
    message: isimessage,
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const isUserProvided = user && user !== "";
    const isMessageProvided = isimessage && isimessage !== "";

    if (isUserProvided && isMessageProvided) {
      // props.sendMessage(user, message);
      // sendMessageUser(pesan)
      console.log(pesan);
      insertChat({
        fromUserId: user,
        toUserId: id,
        message: isimessage,
      });
      setIsiMessage("");
    } else {
      alert("Please insert an user and a message.");
    }
  };

  const onMessageUpdate = (e) => {
    setIsiMessage(e.target.value);
  };

  return (
    <Card size="small">
      <form onSubmit={onSubmit}>
        <label htmlFor="message">{user} :</label>
        <br />
        <Input
          style={{ width: "50%" }}
          type="text"
          id="message"
          name="message"
          value={isimessage}
          onChange={onMessageUpdate}
          onPressEnter={onSubmit}
        />
        <br />
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </form>
    </Card>
  );
};

export default ChatInput;
