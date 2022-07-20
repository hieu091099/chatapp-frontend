import { Button, Col, Input, Row, Tabs, Typography } from "antd";

import React, { useRef, useState } from "react";
import OTPModal from "../../components/OTPModal/OTPModal";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
// import Lottie from "react-lottie";
import * as animationData from "../../assets/main.json";
import * as animationDataCheck from "../../assets/check.json";

import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;
const AuthPage = () => {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [col, setCol] = useState<boolean>(false);
  const navigate = useNavigate();

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
  const checkAniOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataCheck,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // let user = localStorage.getItem("accessToken");
  // console.log({ user });
  // if (user) {
  //   navigate("/home");
  // }
  return (
    <Row className={`login-page ${col ? "full" : ""}`}>
      <Col span={12} className={`login-col left ${col ? "full" : ""}`}>
        {!col ? (
          <Lottie
            style={{ marginTop: "100px" }}
            options={defaultOptions}
            height={"80%"}
            width={"70%"}
          />
        ) : (
          <Lottie
            style={{ marginTop: "100px" }}
            options={checkAniOptions}
            height={"80%"}
            width={"70%"}
          />
        )}

        <OTPModal
          visible={visible}
          setVisible={setVisible}
          setActiveKey={setActiveKey}
        />
      </Col>
      <Col
        span={12}
        // style={col ? { display: "none" } : {}}
        className={`login-col right ${col ? "none" : ""}`}
      >
        {" "}
        <Tabs
          className="login-tab__col"
          tabPosition="right"
          activeKey={activeKey}
          onChange={(key: string) => handleChangeTab(key)}
        >
          <TabPane tab="Login" key="1">
            <Login
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              setCol={setCol}
            />
            {/* <Button
              onClick={() => {
                setCol(!col);
                // setTimeout(() => {
                //   setCol(false);
                //   console.log("test");
                // }, 1200);
              }}
            >
              test
            </Button> */}
          </TabPane>
          <TabPane tab="Register" key="2">
            <Register
              activeKey={activeKey}
              setVisible={setVisible}
              setActiveKey={setActiveKey}
            />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default AuthPage;
