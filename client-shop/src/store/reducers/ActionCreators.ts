import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/api";
import { AppDispatch } from "../store";
import { setCategory, setUserInfo } from "./mainSlice";

interface Data {
  email: string;
  password: string;
}

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  try {
    const res = await userAPI.check();
    return res;
  } catch (e) {
    alert(e);
  }
});

export const setUser = createAsyncThunk("user/setUser", async (data: Data) => {
  try {
    const { email, password } = data;
    const res = await userAPI.login(email, password);
    return res;
  } catch (e) {
    alert(e);
  }
});

export const getUserInfo =
  (userId: number) => async (dispatch: AppDispatch) => {
    const res = await userAPI.getUserInfo(userId);
    dispatch(setUserInfo(res));
  };

export const updateLogo = (data: FormData) => async (dispatch: AppDispatch) => {
  const res = await userAPI.updateLogo(data);
  dispatch(setUserInfo(res));
};

export const updateName =
  (userId: number, name: string) => async (dispatch: AppDispatch) => {
    const res = await userAPI.updateName(userId, name);
    dispatch(setUserInfo(res));
  };

export const getCategory =
  (userId: number) => async (dispatch: AppDispatch) => {
    const res = await userAPI.getCategory(userId);
    dispatch(setCategory(res));
  };

export const createCategory =
  (userId: number, name: string) => async (dispatch: AppDispatch) => {
    const res = await userAPI.addCategory(userId, name);
    console.log(res);
    dispatch(setCategory(res));
  };

// export const createUser = (data: DataU) => async (dispatch: AppDispatch) => {
//   const { email, password, role } = data;
//   await userAPI.registration(email, password, role);
//   dispatch(setUsers({ page: 1, limit: 9 }));
// };
