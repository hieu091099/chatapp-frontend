import { Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import PersonalMessage from "./PersonalMessage/PersonalMessage";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
interface Props {
  setChooseConversation: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}
const ListContact: React.FC<Props> = ({ setChooseConversation }) => {
  const [friend, setFriend] = useState<[]>([]);
  const getAllFriend = async () => {
    let accessToken: string = JSON.parse(
      localStorage.getItem("accessToken") || ""
    );
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let result = await axios({
      method: "GET",
      url: `${BASE_URL}/user/getFriendByUserId/${user.id}`,
      headers: {
        "x-access-token": accessToken,
      },
    });
    setFriend(result.data.user);
  };
  useEffect(() => {
    getAllFriend();
  }, []);
  const renderFriend = () => {
    return friend.map((item, index) => {
      return (
        <PersonalMessage
          key={index}
          user={item}
          setChooseConversation={setChooseConversation}
        />
      );
    });
  };
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
        <div className="list-messages">{renderFriend()}</div>
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
        <div className="list-messages">
          {/* <PersonalMessage />
          <PersonalMessage />
          <PersonalMessage /> */}
        </div>
      </div>
    </div>
  );
};

export default ListContact;
