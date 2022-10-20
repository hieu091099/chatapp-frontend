import React, { useEffect, useState } from "react";
import { BsCameraVideo, BsTelephone, BsSearch } from "react-icons/bs";
import { userSelector } from "../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import _ from "lodash";
import axios from "axios";
import { BASE_URL } from "./../../utils/config";
import moment from "moment";
import { getLastTimeActive } from "../../redux/features/user/userAPI";
// import "moment/locale/vi"; // without this line it didn't work
// moment.locale("vi");

type Props = {};

const HeaderBar = (props: Props) => {
  const { userCurrent, chatCurrent, usersOnline, lastTimeActive } =
    useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const checkIsOnline = (): Boolean => {
    let check = usersOnline.findIndex((i) => i.userId === chatCurrent.id);
    if (check !== -1) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    dispatch(getLastTimeActive(chatCurrent.id));
  }, [usersOnline]);
  return (
    <div className="header-bar">
      <div className="header-bar__left">
        <div className="header-avatar">
          <img
            src={
              chatCurrent.id !== 0
                ? chatCurrent.avatarPath
                : userCurrent.avatarPath
            }
            alt=""
          />
        </div>
        <div className="header-info">
          <div className="name">
            {chatCurrent?.id !== 0 ? chatCurrent.displayName : `Your Cloud`}
          </div>
          {checkIsOnline() || chatCurrent.id === 0 ? (
            <div className="active">
              <div className="type online"></div>
              <div className="status">Online</div>
            </div>
          ) : (
            <div className="active">
              {/* <div className="type online"></div> */}
              <div className="status">{moment(lastTimeActive).fromNow()}</div>
            </div>
          )}
        </div>
      </div>
      <div className="header-bar__right">
        <div className="header-avatar__group"></div>
        <div className="header-function">
          <div className="function-item">
            <BsTelephone />
          </div>
          <div className="function-item">
            <BsCameraVideo />
          </div>
          <div className="function-item">
            <BsSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
