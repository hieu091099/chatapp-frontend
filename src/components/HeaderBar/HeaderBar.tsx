import React from "react";
import { BsCameraVideo, BsTelephone, BsSearch } from "react-icons/bs";
type Props = {};

const HeaderBar = (props: Props) => {
  return (
    <div className="header-bar">
      <div className="header-bar__left">
        <div className="header-avatar">
          <img
            src="https://hit.edu.vn/nhung-nhan-vat-manh-nhat-trong-naruto/imager_6512.jpg"
            alt=""
          />
        </div>
        <div className="header-info">
          <div className="name">Stephen Curry</div>
          <div className="active">
            <div className="type online"></div>
            <div className="status">Online</div>
          </div>
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
