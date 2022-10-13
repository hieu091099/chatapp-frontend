import React from "react";
import { BsCameraVideo, BsTelephone, BsSearch } from "react-icons/bs";
import { userSelector } from "../../redux/features/user/userSlice";
import { useAppSelector } from "../../redux/hooks";
import _ from "lodash";
type Props = {};

const HeaderBar = (props: Props) => {
  const { userCurrent, chatCurrent, usersOnline } =
    useAppSelector(userSelector);
  console.log(usersOnline);
  const checkIsOnline = (): Boolean => {
    let check = usersOnline.findIndex((i) => i.userId == chatCurrent.id);
    if (check != -1) {
      return true;
    }
    return false;
  };

  return (
    <div className="header-bar">
      <div className="header-bar__left">
        <div className="header-avatar">
          <img
            src={
              chatCurrent.id != 0
                ? chatCurrent.avatarPath
                : userCurrent.avatarPath
            }
            alt=""
          />
        </div>
        <div className="header-info">
          <div className="name">
            {chatCurrent?.id != 0
              ? chatCurrent.displayName
              : `You ( ${userCurrent.displayName} )`}
          </div>
          {checkIsOnline() ? (
            <div className="active">
              <div className="type online"></div>
              <div className="status">Online</div>
            </div>
          ) : (
            <div className="active">
              {/* <div className="type online"></div> */}
              <div className="status">Active 5 minutes ago</div>
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
