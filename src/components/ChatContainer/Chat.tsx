import { Input, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { BsEmojiSmile, BsFillMicFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Message from "../Message/Message";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
interface Props {
  chooseConversation: number | undefined;
}

const Chat: React.FC<Props> = ({ chooseConversation }) => {
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    let resu;
  }, []);
  useEffect(() => {
    setLoading(true);
    getMessages().then((res) => {});
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [chooseConversation]);
  const getMessages = async () => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let result = await axios({
      method: "GET",
      url: `${BASE_URL}/message/getMessage/${user.id}/${chooseConversation}`,
    });
    console.log(result.data);
    return result.data;
  };
  const sendMessage = async () => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
    let result = await axios({
      method: "POST",
      url: BASE_URL + "/message/sendMessage",
      headers: {
        "x-access-token": accessToken,
      },
      data: {
        senderId: user.id,
        receiveId: chooseConversation,
        content: message,
      },
    });
  };
  return (
    <div className="chat-wrapper">
      {loading ? (
        <div className="chat-content" style={{ justifyContent: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className="chat-content">
          <Message isFriend={true} />
          <Message isFriend={false} />

          {/* <Message isFriend={false} /> */}
        </div>
      )}
      <div className="input-chat">
        <Input
          className="input-custom"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onPressEnter={() => sendMessage()}
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
