import { IUser } from "../models/IUser";

export interface UserState {
  users: IUser[];
  totalPages: number;
  user: any;
  isLoading: boolean;
  isAuth: boolean;
  error: string;
  currentPage: number;
  limit: number;
}
