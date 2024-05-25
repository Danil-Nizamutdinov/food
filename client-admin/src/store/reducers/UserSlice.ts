import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/main";
import { setUser, checkUser } from "./ActionCreators";

const initialState: UserState = {
  user: {},
  isLoading: false,
  isAuth: localStorage.getItem("token") ? true : false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut(state) {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      if (!action.payload.email) {
        state.error = action.payload.message;
      } else {
        state.user = action.payload;
        state.isAuth = action.payload.email ? true : false;
      }

      state.isLoading = false;
    });
    builder.addCase(checkUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      if (!action.payload.email) {
        state.error = action.payload.message;
      } else {
        state.user = action.payload;
      }
      state.isLoading = false;
    });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
