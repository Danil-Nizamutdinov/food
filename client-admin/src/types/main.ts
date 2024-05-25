interface IUser {
  id: number;
  email: string;
  role: string;
}

type User = {
  id?: number;
  email?: string;
  role?: string;
};

export interface UserState {
  user: User;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
}

export interface UserListState {
  users: IUser[];
  totalPages: number;
  isLoading: boolean;
  error: string;
  currentPage: number;
  limit: number;
}

export interface UserAction {
  users: IUser[];
  totalPages: number;
}
