import { Button, Checkbox, Col, Input, Row, Tabs, Typography } from "antd";
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
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import axios from "axios";

interface Props {
  activeKey: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}
interface User {
  username: string;
  password: string;
  email: string;
  displayName: string;
}
const Register: React.FC<Props> = ({ setVisible, activeKey, setActiveKey }) => {
  const element = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
    displayName: "",
  });
  // console.log(user);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleLogin = async () => {
    const result = await axios({
      method: "POST",
      url: "http://192.168.18.172:3030/api/user/register",
      data: user,
    });
    localStorage.setItem("user", JSON.stringify(result.data));
    setVisible(true);
  };
  useEffect(() => {
    setUser({
      username: "",
      password: "",
      email: "",
      displayName: "",
    });
  }, [activeKey]);
  return (
    <div className="form__login">
      <div className="form__login-content">
        <div className="form__login-title">
          <Typography.Title
            level={2}
            style={{ marginBottom: "5px", textAlign: "center", color: "white" }}
          >
            Sign Up
          </Typography.Title>
        </div>
        <div>
          <Typography.Title
            level={5}
            style={{ marginBottom: "5px", color: "white" }}
          >
            Username
          </Typography.Title>
          <Input
            // style={{ borderRadius: "5px" }}
            value={user.username}
            className="my-input"
            placeholder="Your User Name"
            prefix={<UserOutlined />}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Typography.Title
            level={5}
            style={{ marginBottom: "5px", color: "white" }}
          >
            Full Name
          </Typography.Title>
          <Input
            // style={{ borderRadius: "5px" }}
            className="my-input"
            value={user.displayName}
            placeholder="Your Full Name"
            prefix={<UserOutlined />}
            onChange={(e) => setUser({ ...user, displayName: e.target.value })}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Typography.Title
            level={5}
            style={{ marginBottom: "5px", color: "white" }}
          >
            Email
          </Typography.Title>
          <Input
            // style={{ borderRadius: "5px" }}
            className="my-input"
            value={user.email}
            placeholder="Your Email"
            prefix={<MailOutlined />}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Typography.Title
            level={5}
            style={{ marginBottom: "5px", color: "white" }}
          >
            Password
          </Typography.Title>
          <Input.Password
            // style={{ borderRadius: "5px" }}
            className="my-input"
            value={user.password}
            placeholder="Your Password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Typography.Title
            level={5}
            style={{ marginBottom: "5px", color: "white" }}
          >
            Confirm Password
          </Typography.Title>
          <Input.Password
            // style={{ borderRadius: "5px" }}
            // value={user.}
            className="my-input"
            placeholder="Confirm Your Password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
      </div>

      <Checkbox style={{ margin: "10px 0" }} onChange={onChange}>
        <label style={{ color: "white" }}>
          I agree to all the <strong>Term</strong> ,
          <strong>Privacy Policy</strong> and <strong>Fees</strong>
        </label>
      </Checkbox>
      <div style={{ marginTop: "10px" }}>
        <Button
          type="primary"
          style={{
            width: "100%",
            height: "40px",
            // backgroundColor: "#111d2c",
            // borderColor: "#111d2c",
          }}
          onClick={handleLogin}
        >
          Register
        </Button>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <label htmlFor="" style={{ color: "white" }}>
          Already have an account ?
          <a onClick={() => setActiveKey("1")}>Sign In</a>
        </label>
      </div>
    </div>
  );
};

export default Register;
