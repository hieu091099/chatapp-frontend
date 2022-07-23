import React from "react";

const PersonalMessage = () => {
  return (
    <div className="personal-message">
      <div className="personal-message__left">
        <div className="person-avatar">
          <img
            className="avatar"
            src="https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-30.jpg"
            alt=""
          />
        </div>
        <div className="personal-info">
          <div className="name">Stephen Curry</div>
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
