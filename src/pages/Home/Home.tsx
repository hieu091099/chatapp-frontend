import { Col, Row } from "antd";
import React from "react";
import Chat from "../../components/ChatContainer/Chat";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import ListContact from "../../components/ListContact/ListContact";
import RightSideBar from "../../components/RightSideBar/RightSideBar";

const Home = () => {
  return (
    <Row style={{ backgroundColor: "#212329", height: "100%", width: "100%" }}>
      <Col md={2} lg={2} xl={1}>
        <LeftSideBar />
      </Col>
      <Col md={7} lg={6} xl={5}>
        <ListContact />
      </Col>
      <Col md={10} lg={10} xl={12}>
        <div style={{ backgroundColor: "#131517" }}>
          <HeaderBar />
        </div>
        <Chat />
      </Col>
      <Col md={5} lg={6} xl={6}>
        <RightSideBar />
      </Col>
    </Row>
  );
};

export default Home;
