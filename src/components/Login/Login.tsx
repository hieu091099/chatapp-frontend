import {
  Button,
  Col,
  Input,
  notification,
  Row,
  Spin,
  Tabs,
  Typography,
} from "antd";
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
import axios from "axios";
import { instance } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { userSelector } from "../../redux/features/user/userSlice";
import { login } from "./../../redux/features/user/userAPI";

interface Props {
  activeKey: string;
  setCol: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}
const Login: React.FC<Props> = ({ activeKey, setActiveKey, setCol }) => {
  const element = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { userCurrent, isLoggedIn, errorLogin } = useAppSelector(userSelector);
  console.log({ userCurrent });
  const [changeStateLogin, setChangeStateLogin] = useState<number>(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setChangeStateLogin(changeStateLogin + 1);
    dispatch(login(user));
  };
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == 'Enter'){
      setChangeStateLogin(changeStateLogin + 1);
      dispatch(login(user));
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      setCol(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } else if (!isLoggedIn && errorLogin != "") {
      notification["error"]({
        message: "Notification",
        description: errorLogin,
        duration: 1,
      });
    }
  }, [errorLogin, isLoggedIn]);
  useEffect(() => {
    setUser({ username: "", password: "" });
  }, [activeKey]);

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
              Username
            </Typography.Title>
            <Input
              // style={{ borderRadius: "5px" }}
              value={user.username}
              placeholder="Your Username"
              prefix={<UserOutlined />}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Typography.Title level={5} style={{ marginBottom: "5px" }}>
              Password
            </Typography.Title>
            <Input.Password
              // style={{ borderRadius: "5px" }}
              value={user.password}
              placeholder="Your Password"
              prefix={<KeyOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onKeyDown={handleKeyDown}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
