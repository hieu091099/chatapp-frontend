import React, { useState } from "react";
import {
  MergeCellsOutlined,
  MessageOutlined,
  FolderOpenOutlined,
  PhoneOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { IoIosPeople } from "react-icons/io";
import img from "../../assets/avatar/avatar.jpg";
import { User } from "../../models/model";
import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/features/user/userSlice";

const LeftSideBar = () => {
  let user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const { usersOnline } = useAppSelector(userSelector);

  const [isActive, setIsActive] = useState(1);
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="left-sidebar">
      <div className="left-sidebar__top">
        <div
          className={`left-sidebar__icon ${isActive == 1 ? "active" : ""}`}
          onClick={() => setIsActive(1)}
        >
          <MergeCellsOutlined className="sidebar-icon" />
        </div>
        <div
          className={`left-sidebar__icon ${isActive == 2 ? "active" : ""}`}
          onClick={() => setIsActive(2)}
        >
          <MessageOutlined className="sidebar-icon" />
        </div>
        <div
          className={`left-sidebar__icon ${isActive == 6 ? "active" : ""}`}
          onClick={() => setIsActive(6)}
        >
          <FolderOpenOutlined className="sidebar-icon" />
        </div>
        <div
          className={`left-sidebar__icon ${isActive == 3 ? "active" : ""}`}
          onClick={() => setIsActive(3)}
        >
          <PhoneOutlined className="sidebar-icon" />
        </div>
        <div
          className={`left-sidebar__icon ${isActive == 4 ? "active" : ""}`}
          onClick={() => setIsActive(4)}
        >
          <IoIosPeople className="sidebar-icon" />
        </div>
        <div
          className={`left-sidebar__icon ${isActive == 5 ? "active" : ""}`}
          onClick={() => {
            // setIsActive(5);
            logout();
          }}
        >
          <SettingOutlined className="sidebar-icon" />
        </div>
        <div className="slide"></div>
      </div>
      <div className="left-sidebar__bottom">
        <img className="sidebar-avatar" src={user.avatarPath} alt="" />
      </div>
    </div>
  );
};

export default LeftSideBar;
