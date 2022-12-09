import moment from "moment";
import React from "react";
import { FriendItem, User } from "../../../models/model";
import { getLastTimeActive } from "../../../redux/features/user/userAPI";
import {
  setChatCurrent,
  setLastTimeActive,
  userSelector,
} from "../../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

interface Props {
  user: FriendItem;
}
const PersonalMessage: React.FC<Props> = ({ user }) => {
  const { usersOnline } = useAppSelector(userSelector);
  const checkIsOnline = (): Boolean => {
    let check = usersOnline.findIndex((i) => i.userId === user.id);
    if (check !== -1) {
      return true;
    }
    return false;
  };
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
          {checkIsOnline() ? <span className="status"></span> : <></>}
        </div>
        <div className="personal-info">
          <div className="name">{user.displayName}</div>
          <div className="last-message">{user.latestMessage}</div>
        </div>
      </div>
      <div className="personal-message__right">
        <div className="time-active">
          {moment(user.updatedAt).format("hh:mm A")}
        </div>
        <div className="count-unread">
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalMessage;
