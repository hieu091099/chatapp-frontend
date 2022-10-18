import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MessageM, User } from "../../models/model";
import { userSelector } from "../../redux/features/user/userSlice";
import { useAppSelector } from "../../redux/hooks";
import moment from "moment";
type Props = {
  isFriend: boolean;
  message: MessageM;
  chatCurrent: User;
};

const Message: React.FC<Props> = ({ isFriend, message, chatCurrent }) => {
  const { userCurrent } = useAppSelector(userSelector);
  // console.log(message.createdAt);
  return (
    <div className={`message-item ${!isFriend ? "my-mes" : ""}`}>
      <div
        className="left-content"
        style={!isFriend ? { display: "none" } : {}}
      >
        <img
          src={isFriend ? chatCurrent.avatarPath : userCurrent.avatarPath}
          alt=""
        />
      </div>
      <div className="right-content">
        <div className="info">
          <div className="name">
            {isFriend ? chatCurrent.displayName : "You"}
          </div>
          <div className="time">{moment(message.createdAt).fromNow()}</div>
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
