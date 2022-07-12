import { Button, Col, Input, Row, Spin, Tabs, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  KeyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  TwitterOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import OTPModal from "../../components/OTPModal/OTPModal";

interface Props {
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}
const Login: React.FC<Props> = ({ setActiveKey }) => {
  const element = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <Spin spinning={loading} tip="Loading...">
      <div className="form__login">
        <div className="form__login-content">
          <div className="form__login-title">
            <Typography.Title
              level={2}
              style={{ marginBottom: "5px", textAlign: "center" }}
            >
              Sign In
            </Typography.Title>
          </div>
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
            margin: "10px 0",
          }}
        >
          <a>Forget password?</a>
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
            Need an account? <a onClick={() => setActiveKey("2")}>Sign Up</a>
          </label>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
          }}
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <span className="border-icons">
            <FacebookOutlined className="icon-login" />
          </span>
          <span className="border-icons">
            <GoogleOutlined className="icon-login" />
          </span>
          <span className="border-icons">
            <TwitterOutlined className="icon-login" color="white" />
          </span>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
