import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setUser, checkUser } from "./ActionCreators";
import { MainState } from "../../types/user";

const initialState: MainState = {
  user: null,
  userInfo: null,
  category: null,
  userItem: null,
  categoryId: null,
  userItems: { message: "тут пусто" },
  isAuth: localStorage.getItem("token") ? true : false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // increment(state, action: PayloadAction<number>) {
    //   state.count += action.payload;
    // },
    signOut(state) {
      localStorage.removeItem("token");
      state.isAuth = false;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setUserItem(state, action) {
      state.userItem = action.payload;
    },
    setUserItems(state, action) {
      state.userItems = action.payload;
    },
    setCurrentCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = action.payload.email ? true : false;
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  signOut,
  setUserInfo,
  setCategory,
  setUserItem,
  setUserItems,
  setCurrentCategoryId,
} = mainSlice.actions;

export default mainSlice.reducer;
