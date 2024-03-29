import { Collapse } from "antd";
import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { BsImage } from "react-icons/bs";
import { BiVideo } from "react-icons/bi";
import { GiClaymoreExplosive } from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/features/user/userSlice";
const { Panel } = Collapse;
type Props = {};

const RightSideBar = (props: Props) => {
  const { chatCurrent } = useAppSelector(userSelector);
  return (
    <div className="right-sidebar">
      <div className="right-sidebar__info">
        <img className="person-avatar" src={chatCurrent.avatarPath} alt="" />
        <h2 className="person-name">{chatCurrent.displayName}</h2>
        <p>Create something New</p>
      </div>
      <div className="right-sidebar__function">
        <Collapse defaultActiveKey={["1"]} expandIconPosition={"end"}>
          <Panel header="Attachments" key="1">
            <div className="attachment-item">
              <div className="item-icon">
                <AiOutlineFileText />
              </div>
              <div className="item-info">
                <div className="item-title">Document</div>
                <div className="item-detail">0 Files - 0 MB</div>
              </div>
            </div>
            <div className="attachment-item">
              <div className="item-icon">
                <BsImage />
              </div>
              <div className="item-info">
                <div className="item-title">Photo</div>
                <div className="item-detail">0 Files - 0 MB</div>
              </div>
            </div>
            <div className="attachment-item">
              <div className="item-icon">
                <BiVideo />
              </div>
              <div className="item-info">
                <div className="item-title">Video</div>
                <div className="item-detail">0 Files - 0 MB</div>
              </div>
            </div>
            <div className="attachment-item">
              <div className="item-icon">
                <GiClaymoreExplosive />
              </div>
              <div className="item-info">
                <div className="item-title">Orther Files</div>
                <div className="item-detail">0 Files - 0 MB</div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default RightSideBar;
