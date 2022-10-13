import { instance } from "../../../utils/config";
import { AppThunk } from "../../store";
import {
  setCurrentUser,
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
