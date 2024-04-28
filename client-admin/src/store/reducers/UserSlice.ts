import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/user";
import { setUser, checkUser } from "./ActionCreators";

const initialState: UserState = {
  users: [],
  user: {},
  totalPages: 0,
  isLoading: false,
  isAuth: localStorage.getItem("token") ? true : false,
  error: "",
  currentPage: 1,
  limit: 9,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment(state, action: PayloadAction<number>) {
    //   state.count += action.payload;
    // },
    signOut(state) {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
    setUsers(state, action) {
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
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

export const { signOut, setCurrentPage } = userSlice.actions;

export default userSlice.reducer;
