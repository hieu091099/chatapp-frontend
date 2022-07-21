import { Col, Row } from "antd";
import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import ListContact from "../../components/ListContact/ListContact";

const Home = () => {
  return (
    <Row style={{ backgroundColor: "#212329", height: "100%", width: "100%" }}>
      <Col span={2}>
        <LeftSideBar />
      </Col>
      <Col span={8}>
        <ListContact />
      </Col>
    </Row>
  );
};

export default Home;
