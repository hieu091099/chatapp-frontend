import React from "react";
import { User } from "../../../models/model";
import { getLastTimeActive } from "../../../redux/features/user/userAPI";
import {
  setChatCurrent,
  setLastTimeActive,
} from "../../../redux/features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
} from "./../../../redux/features/counter/counterSlice";

interface Props {
  user: User;
}
const PersonalMessage: React.FC<Props> = ({ user }) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <div
      className="personal-message"
      onClick={() => {
        dispatch(setChatCurrent(user));
        dispatch(getLastTimeActive(user.id));
      }}
    >
      <div className="personal-message__left">
        <div className="person-avatar">
          <img className="avatar" src={user.avatarPath} alt="" />
        </div>
        <div className="personal-info">
          <div className="name">{user.displayName}</div>
          <div className="last-message">Callback hell </div>
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
