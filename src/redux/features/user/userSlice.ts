import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/model";
import { AppThunk, RootState } from "../../store";

export interface UserState {
  userCurrent: {
    id: number;
    email: string;
    avatarPath: string;
    displayName: string;
    isAdmin: any;
    status: boolean;
  };
  isLoggedIn: boolean;
  isLoginLoading: boolean;
  errorLogin: string;
}

const initialState: UserState = {
  userCurrent: {
    id: 0,
    email: "",
    avatarPath: "",
    displayName: "",
    isAdmin: "",
    status: false,
  },
  isLoggedIn: false,
  isLoginLoading: false,
  errorLogin: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.userCurrent = payload;
    },
    setLoginLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoginLoading = payload;
    },
    setLoginError: (state, { payload }: PayloadAction<any>) => {
      state.errorLogin = payload;
    },
    setLoggedIn: (state, { payload }: PayloadAction<any>) => {
      state.isLoggedIn = payload;
    },
  },
  extraReducers: (builder) => {
    // builder;
  },
});

export const { setCurrentUser, setLoginLoading, setLoginError, setLoggedIn } =
  userSlice.actions;

export const userSelector = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
