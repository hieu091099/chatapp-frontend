import { Button, Col, Input, Row, Tabs, Typography } from "antd";

import React, { useRef, useState } from "react";
import OTPModal from "../../components/OTPModal/OTPModal";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
// import Lottie from "react-lottie";
import * as animationData from "../../assets/main.json";
import Lottie from "react-lottie";
const { TabPane } = Tabs;
const AuthPage = () => {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const handleLogin = () => {
    setVisible(true);
  };
  const handleChangeTab = (key: string) => {
    setActiveKey(key);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Row className="login-page">
      <Col span={12} className="login-col left">
        <Lottie
          style={{ marginTop: "100px" }}
          options={defaultOptions}
          height={"80%"}
          width={"70%"}
        />
        <OTPModal visible={visible} setVisible={setVisible} />
      </Col>
      <Col span={12} className="login-col right">
        {" "}
        <Tabs
          className="login-tab__col"
          tabPosition="right"
          activeKey={activeKey}
          onChange={(key: string) => handleChangeTab(key)}
        >
          <TabPane tab="Login" key="1">
            <Login setActiveKey={setActiveKey} />
          </TabPane>
          <TabPane tab="Register" key="2">
            <Register setVisible={setVisible} setActiveKey={setActiveKey} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default AuthPage;
