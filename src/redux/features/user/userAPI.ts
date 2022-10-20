import axios from "axios";
import { BASE_URL, instance } from "../../../utils/config";
import { AppThunk } from "../../store";
import {
  setCurrentUser,
  setLastTimeActive,
  setLoggedIn,
  setLoginError,
  setLoginLoading,
} from "./userSlice";

// A mock function to mimic making an async request for data
export const login = (user: any): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoginLoading(true));
    try {
      const result = await instance.post("/user/login", user);
      if (result.data.authenticated == true) {
        setTimeout(() => {
          dispatch(setLoginLoading(false));
          dispatch(setLoggedIn(true));
        }, 1500);
        dispatch(setCurrentUser(result.data.user));
        localStorage.setItem("user", JSON.stringify(result.data.user));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(result.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(result.data.refreshToken)
        );
      } else {
        dispatch(setLoginError(result.data.message));
        dispatch(setLoginLoading(false));
      }
    } catch (error) {
      dispatch(setLoginError(error));
      dispatch(setLoginLoading(false));
    }
  };
};
export const getLastTimeActive = (userId: number): AppThunk => {
  return async (dispatch) => {
    try {
      let accessToken: string = JSON.parse(
        localStorage.getItem("accessToken") || ""
      );
      let result = await axios({
        method: "GET",
        url: `${BASE_URL}/userStatus/${userId}`,
        headers: {
          "x-access-token": accessToken,
        },
      });
      if (result.status === 200) {
        dispatch(setLastTimeActive(result.data.time));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
