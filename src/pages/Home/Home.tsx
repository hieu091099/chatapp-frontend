import { Col, Row } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Chat from "../../components/ChatContainer/Chat";
import _ from "lodash";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import ListContact from "../../components/ListContact/ListContact";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import {
  setCurrentUser,
  setLastTimeActive,
  setUserOnline,
  userSelector,
} from "../../redux/features/user/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "./../../redux/hooks";
import { getLastTimeActive } from "../../redux/features/user/userAPI";
const Home = () => {
  const { userCurrent, usersOnline, chatCurrent } =
    useAppSelector(userSelector);
  const socket: any = useRef();
  let user = JSON.parse(localStorage.getItem("user") || "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_.isEmpty(userCurrent.id)) {
      dispatch(setCurrentUser(user));
    }
  }, []);

  useEffect(() => {
    socket.current = io("ws://192.168.18.172:8900", {
      transports: ["websocket"],
    });
    if (userCurrent) {
      socket.current.emit("addUser", userCurrent.id);
    }
    socket.current.on("getUsers", (users: any) => {
      dispatch(setUserOnline(users));
      dispatch(getLastTimeActive(chatCurrent.id));
    });

    // return () => {
    //   socket.off("connect");
    //   socket.off("disconnect");
    // };
  }, [userCurrent]);
  return (
    <Row style={{ backgroundColor: "#212329", height: "100%", width: "100%" }}>
      <Col md={2} lg={2} xl={1}>
        <LeftSideBar />
      </Col>
      <Col md={7} lg={6} xl={5} style={{ backgroundColor: "#212329" }}>
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
