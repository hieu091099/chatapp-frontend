import { Input, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { BsEmojiSmile, BsFillMicFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Message from "../Message/Message";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { MessageM } from "../../models/model";
import { io } from "socket.io-client";
import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/features/user/userSlice";

const Chat: React.FC = () => {
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { chatCurrent } = useAppSelector(userSelector);
  const [arrivalMessage, setArrivalMessage] = useState<any>({});
  const [countSendSuccess, setCountSendSuccess] = useState<number>(0);
  const [listMessage, setListMessage] = useState<MessageM[]>([]);
  const socket: any = useRef();
  useEffect(() => {
    getMessages().then((res) => {
      setListMessage(res);
    });
  }, [chatCurrent.id, countSendSuccess]);
  console.log("test", arrivalMessage);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on(
      "getMessage",
      (data: { senderId: number; receiveId: number; content: string }) => {
        console.log({ data });
        setArrivalMessage({
          senderId: data.senderId,
          content: data.content,
          createdAt: Date.now(),
        });
      }
    );
  }, []);

  const getMessages = async () => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let result = await axios({
      method: "GET",
      url: `${BASE_URL}/message/getMessages/${user.id}/${chatCurrent.id}`,
    });
    // console.log(result.data);
    return result.data;
  };
  const sendMessage = async () => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
    setLoading(true);

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiveId: chatCurrent.id,
      content: message,
    });
    let result = await axios({
      method: "POST",
      url: BASE_URL + "/message/sendMessage",
      headers: {
        "x-access-token": accessToken,
      },
      data: {
        senderId: user.id,
        receiveId: chatCurrent.id,
        content: message,
      },
    });
    if (result.status == 200) {
      setCountSendSuccess(countSendSuccess + 1);
      setMessage("");
      setLoading(false);
    }
  };
  const renderMess = (listMessage: MessageM[]) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    return listMessage.map((e, index) => {
      if (e.senderId !== user.id) {
        return <Message key={index} isFriend={true} message={e} />;
      } else {
        return <Message key={index} isFriend={false} message={e} />;
      }
    });
  };
  return (
    <div className="chat-wrapper">
      {loading ? (
        <div className="chat-content" style={{ justifyContent: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className="chat-content">{renderMess(listMessage)}</div>
      )}
      <div className="input-chat">
        <Input
          value={message}
          className="input-custom"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onPressEnter={() => sendMessage()}
          size="large"
          placeholder="Add a comment..."
          addonAfter={
            <div
              className="icon-chat"
              style={{ fontSize: "20px" }}
              onClick={() => sendMessage()}
            >
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
