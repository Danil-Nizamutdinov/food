export interface User {
  id: number;
  email: string;
  role: string;
}

export interface MainState {
  user: User | null;
  userInfo: any;
  category: any;
  isAuth: boolean;
}
