import { message } from "antd";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MessageM } from "../../models/model";
type Props = {
  isFriend: boolean;
  message: MessageM;
};

const Message: React.FC<Props> = ({ isFriend, message }) => {
  return (
    <div className={`message-item ${!isFriend ? "my-mes" : ""}`}>
      <div className="left-content">
        <img
          src="https://yt3.ggpht.com/sIFsQTLAubcA_rGN1ohx2R2yOSnVZV5nq-p2116g0YBI73NfGqpFPvqG5sQSvXh-pOQDRTdG=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />
      </div>
      <div className="right-content">
        <div className="info">
          <div className="name">{isFriend ? "Namikaze Minato" : "You"}</div>
          <div className="time">15:14 PM</div>
        </div>
        <div className="message-content">
          <div className="message">{message.content}</div>
          <div className="more-function">
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
