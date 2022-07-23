import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { BsEmojiSmile, BsFillMicFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Message from "../Message/Message";
type Props = {};

const Chat = (props: Props) => {
  const [isFriend, setIsFriend] = useState<boolean>(false);
  return (
    <div className="chat-wrapper">
      <div className="chat-content">
        <Message isFriend={true} />
        <Message isFriend={false} />

        {/* <Message isFriend={false} /> */}
      </div>
      <div className="input-chat">
        <Input
          className="input-custom"
          size="large"
          placeholder="Add a comment..."
          addonAfter={
            <div className="icon-chat" style={{ fontSize: "20px" }}>
              <FiSend />
            </div>
          }
          prefix={
            <div className="icon-chat">
              <BsFillMicFill />
            </div>
          }
          suffix={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="icon-chat" style={{ marginRight: "10px" }}>
                <FaImage />
              </div>
              <div className="icon-chat">
                <BsEmojiSmile />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Chat;
