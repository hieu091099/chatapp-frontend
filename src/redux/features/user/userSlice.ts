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
  chatCurrent: {
    id: number;
    email: string;
    avatarPath: string;
    displayName: string;
    isAdmin: any;
    status: boolean;
  };
  usersOnline: [
    {
      userId: number;
      socketId: string;
    }
  ];
  isLoggedIn: boolean;
  isLoginLoading: boolean;
  errorLogin: string;
  lastTimeActive: string;
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
  chatCurrent: {
    id: 0,
    email: "",
    avatarPath: "",
    displayName: "",
    isAdmin: "",
    status: false,
  },
  usersOnline: [
    {
      userId: -1,
      socketId: "",
    },
  ],
  isLoggedIn: false,
  isLoginLoading: false,
  errorLogin: "",
  lastTimeActive: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.userCurrent = payload;
    },
    setUserOnline: (
      state,
      { payload }: PayloadAction<[{ userId: number; socketId: string }]>
    ) => {
      state.usersOnline = payload;
    },
    setChatCurrent: (state, { payload }: PayloadAction<User>) => {
      state.chatCurrent = payload;
    },
    setLoginLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoginLoading = payload;
    },
    setLoginError: (state, { payload }: PayloadAction<any>) => {
      state.errorLogin = payload;
    },
    setLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
    setLastTimeActive: (state, { payload }: PayloadAction<string>) => {
      state.lastTimeActive = payload;
    },
  },
  extraReducers: (builder) => {
    // builder;
  },
});

export const {
  setCurrentUser,
  setLoginLoading,
  setLoginError,
  setLoggedIn,
  setUserOnline,
  setChatCurrent,
  setLastTimeActive,
} = userSlice.actions;

export const userSelector = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
