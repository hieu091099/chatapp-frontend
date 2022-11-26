import { Input, Spin } from "antd";
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
import { EmojiClickData, Theme } from "emoji-picker-react";
import moment from "moment";
import { debounce } from "lodash";
import EmojiPicker from "emoji-picker-react";
const Chat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { chatCurrent, userCurrent } = useAppSelector(userSelector);
  const [userTyping, setUserTyping] = useState<any>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [arrivalMessage, setArrivalMessage] = useState<any>({});
  const [listMessage, setListMessage] = useState<MessageM[]>([]);
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState<boolean>(false);
  const scrollRef = useRef<null | HTMLElement>(null);
  const socket: any = useRef();
  useEffect(() => {
    socket.current = io("ws://192.168.18.172:8900", {
      transports: ["websocket"],
    });
    socket.current.on(
      "getMessage",
      (data: { senderId: number; receiveId: number; content: string }) => {
        setArrivalMessage({
          senderId: data.senderId,
          receiveId: data.receiveId,
          content: data.content,
          createdAt: moment().format(),
        });
      }
    );
    socket.current.on("getUserTyping", (data: any) => {
      setUserTyping(data);
    });
  }, []);
  // useEffect(())

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  /** get messages when change message box */
  useEffect(() => {
    const getMessages = async () => {
      let user = JSON.parse(localStorage.getItem("user") || "{}");
      let result = await axios({
        method: "GET",
        url: `${BASE_URL}/message/getMessages/${user.id}/${chatCurrent.id}`,
      });
      setListMessage(result.data);
    };
    getMessages();
  }, [chatCurrent.id]);
  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.receiveId === userCurrent.id &&
      setListMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  /** use when user is typing */
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    if (isTyping) {
      socket.current.emit("addUserTyping", {
        senderId: user.id,
        receiveId: chatCurrent.id,
      });
    } else {
      socket.current.emit("removeUserTyping", {
        senderId: user.id,
        receiveId: chatCurrent.id,
      });
    }
  }, [isTyping]);

  useEffect(() => {
    if (message.length > 0) {
      socket.current.emit("addUserTyping", {
        senderId: userCurrent.id,
        receiveId: chatCurrent.id,
      });
    } else if (message.length === 0) {
      socket.current.emit("removeUserTyping", {
        senderId: userCurrent.id,
        receiveId: chatCurrent.id,
      });
    }
  }, [message]);

  const checkIsUserTyping = (array: any, id: number) => {
    for (let i in array) {
      if (array[i].senderId == id && array[i].receiveId == userCurrent.id) {
        return true;
      }
    }
    return false;
  };
  const handleIsTyping = debounce(() => {
    // setIsTyping(false);
  }, 5000);

  const sendMessage = async () => {
    if (message !== "" && chatCurrent.id !== 0) {
      let user = JSON.parse(localStorage.getItem("user") || "{}");
      let accessToken = JSON.parse(localStorage.getItem("accessToken") || "");

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
      if (result.status === 200) {
        socket.current.emit("removeUserTyping", {
          senderId: user.id,
          receiveId: chatCurrent.id,
        });
        setListMessage([...listMessage, result.data.message]);
        setMessage("");
        // setLoading(false);
      }
    } else {
      setMessage("");
    }
  };
  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    console.log(emojiObject);
    setMessage((prevInput) => prevInput + emojiObject.emoji);
    setIsShowEmojiPicker(false);
  };
  const renderMess = (listMessage: MessageM[]) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    return listMessage.map((e, index) => {
      if (e.senderId !== user.id) {
        return (
          <Message
            key={index}
            isFriend={true}
            message={e}
            chatCurrent={chatCurrent}
          />
        );
      } else {
        return (
          <Message
            key={index}
            isFriend={false}
            message={e}
            chatCurrent={chatCurrent}
          />
        );
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
        <div className="chat-content">
          {renderMess(listMessage)}
          <div ref={scrollRef as React.RefObject<HTMLDivElement>}></div>
        </div>
      )}
      {isShowEmojiPicker && (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: 10, bottom: 10 }}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        </div>
      )}
      <div className="input-chat">
        {checkIsUserTyping(userTyping, chatCurrent.id) ? (
          <div className="user-typing">
            <div>{chatCurrent.displayName} đang nhập tin nhắn </div>
            <div className="loader">
              <div className="dot"> </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <Input
          value={message}
          className="input-custom"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={() => {
            setIsTyping(true);
            handleIsTyping();
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
              <div
                className="icon-chat"
                onClick={() => {
                  setIsShowEmojiPicker(!isShowEmojiPicker);
                }}
              >
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
