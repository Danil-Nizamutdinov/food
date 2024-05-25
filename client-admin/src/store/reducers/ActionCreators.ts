import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/api";
import { AppDispatch, RootState } from "../store";
import { setUsers, pending } from "./UserListSlice";

interface Data {
  email: string;
  password: string;
}

interface DataU {
  email: string;
  password: string;
  role: string;
}

interface DataUs {
  page: number;
  limit?: number;
}

export const getUsers = (data: DataUs) => async (dispatch: AppDispatch) => {
  dispatch(pending());
  const { page, limit } = data;
  const res = await userAPI.getUsers(limit, page);
  dispatch(setUsers(res));
};

export const setUser = createAsyncThunk("user/setUser", async (data: Data) => {
  const { email, password } = data;
  const res = await userAPI.login(email, password);
  return res;
});

export const createUser = (data: DataU) => async (dispatch: AppDispatch) => {
  const { email, password, role } = data;
  await userAPI.registration(email, password, role);
};

export const deleteUser =
  (userId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    await userAPI.deleteUser(userId);
    const state = getState();
    const currentPage = state.userListReducer.currentPage;
    dispatch(getUsers({ page: currentPage, limit: 9 }));
  };

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  try {
    const res = await userAPI.check();
    return res;
  } catch (e) {
    alert(e);
  }
});
