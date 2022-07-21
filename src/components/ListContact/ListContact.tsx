import { Input, Typography } from "antd";
import React from "react";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import PersonalMessage from "./PersonalMessage/PersonalMessage";
const ListContact = () => {
  return (
    <div className="list-contact">
      <div className="list-contact__title">
        <Typography.Title
          style={{ color: "white", letterSpacing: 1 }}
          level={3}
        >
          Messages
        </Typography.Title>
      </div>
      <div className="list-contact__search">
        <Input
          className="custom-input"
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="list-contact__messages">
        <div className="title">
          <BiMessageRoundedDetail size={12} />
          <Typography.Text

          //   level={5}
          >
            All Messages
          </Typography.Text>
        </div>
        <div className="list-messages">
          <PersonalMessage />
        </div>
      </div>
      <div className="list-contact__messages group">
        <div className="title">
          <BsFillPeopleFill size={12} />
          <Typography.Text

          //   level={5}
          >
            Groups
          </Typography.Text>
        </div>
        <div className="list-group"></div>
      </div>
    </div>
  );
};

export default ListContact;
