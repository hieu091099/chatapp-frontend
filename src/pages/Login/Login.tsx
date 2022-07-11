import { Button, Col, Input, Row, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  KeyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import lottie from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import "./Login.css";
import OTPModal from "../../components/OTPModal/OTPModal";
const Login = () => {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleLogin = () => {
    setVisible(true);
  };
  useEffect(() => {
    if (element.current) {
      // add this
      lottie.loadAnimation({
        animationData: require("../../assets/main.json"),
        container: element.current!,
        loop: true,
        autoplay: true,
      });
    }
  }, []);
  return (
    <Row>
      <Col span={12} ref={element}>
        <OTPModal visible={visible} setVisible={setVisible} />
      </Col>
      <Col span={12} style={{ padding: "20px", marginTop: "15%" }}>
        {" "}
        <div className="form__login">
          <div className="form__login-content">
            <div>
              <Typography.Title level={5} style={{ marginBottom: "5px" }}>
                Email
              </Typography.Title>
              <Input
                // style={{ borderRadius: "5px" }}
                placeholder="Your Email"
                prefix={<MailOutlined />}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <Typography.Title level={5} style={{ marginBottom: "5px" }}>
                Password
              </Typography.Title>
              <Input.Password
                // style={{ borderRadius: "5px" }}
                placeholder="Your Password"
                prefix={<KeyOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="">Forget password?</label>
          </div>
          <div>
            <Button
              type="primary"
              style={{
                width: "100%",
                // backgroundColor: "#111d2c",
                // borderColor: "#111d2c",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <label htmlFor="">
              Need an account? <a href="">Sign Up</a>
            </label>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "50px" }}
          >
            <div style={{ width: "30%" }}>
              <hr />
            </div>
            <div
              style={{
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "20px",
                width: "40%",
                // margin: "20px auto",
                padding: "5px",
              }}
            >
              <label htmlFor="">or login with</label>
            </div>
            <div style={{ width: "30%" }}>
              <hr />
            </div>
          </div>

          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
