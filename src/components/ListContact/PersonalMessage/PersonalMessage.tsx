import React from "react";
import { User } from "../../../models/model";
interface Props {
  user: User;
  setChooseConversation: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}
const PersonalMessage: React.FC<Props> = ({ user, setChooseConversation }) => {
  return (
    <div
      className="personal-message"
      onClick={() => setChooseConversation(user.id)}
    >
      <div className="personal-message__left">
        <div className="person-avatar">
          <img className="avatar" src={user.avatarPath} alt="" />
        </div>
        <div className="personal-info">
          <div className="name">{user.displayName}</div>
          <div className="last-message">Callback hell</div>
        </div>
      </div>
      <div className="personal-message__right">
        <div className="time-active">15:20 PM</div>
        <div className="count-unread">
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalMessage;
