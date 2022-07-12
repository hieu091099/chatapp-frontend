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
import React, { useRef, useState } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface Props {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}

const Register: React.FC<Props> = ({ setVisible, setActiveKey }) => {
  const element = useRef<HTMLDivElement>(null);
  //   const [visible, setVisible] = useState(false);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleLogin = () => {
    setVisible(true);
  };
  return (
    <div className="form__login">
      <div className="form__login-content">
        <div className="form__login-title">
          <Typography.Title
            level={2}
            style={{ marginBottom: "5px", textAlign: "center" }}
          >
            Sign Up
          </Typography.Title>
        </div>
        <div>
          <Typography.Title level={5} style={{ marginBottom: "5px" }}>
            Full Name
          </Typography.Title>
          <Input
            // style={{ borderRadius: "5px" }}
            placeholder="Your Full Name"
            prefix={<UserOutlined />}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
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
        <div style={{ marginTop: "10px" }}>
          <Typography.Title level={5} style={{ marginBottom: "5px" }}>
            Confirm Password
          </Typography.Title>
          <Input.Password
            // style={{ borderRadius: "5px" }}
            placeholder="Confirm Your Password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          style={{
            width: "100%",
            // backgroundColor: "#111d2c",
            // borderColor: "#111d2c",
          }}
          onClick={handleLogin}
        >
          Register
        </Button>
      </div>
      <Checkbox style={{ margin: "10px 0" }} onChange={onChange}>
        I agree to all the <strong>Term</strong> ,{" "}
        <strong>Privacy Policy</strong> and <strong>Fees</strong>
      </Checkbox>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <label htmlFor="">
          Already have an account ?{" "}
          <a onClick={() => setActiveKey("1")}>Sign In</a>
        </label>
      </div>
    </div>
  );
};

export default Register;
