import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAction, UserListState } from "../../types/main";

const initialState: UserListState = {
  users: [],
  totalPages: 0,
  isLoading: false,
  error: "",
  currentPage: 1,
  limit: 9,
};

export const userListSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserAction>) {
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    pending(state) {
      state.isLoading = true;
    },
  },
});

export const { setCurrentPage, setUsers, pending } = userListSlice.actions;

export default userListSlice.reducer;
