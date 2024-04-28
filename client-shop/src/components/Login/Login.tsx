import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../store/reducers/ActionCreators";

const Login: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const updateLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setLogin(text);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setPassword(text);
  };

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUser({ email: login, password }));
  };

  return (
    <div className="login">
      <h2 className="login_title">Вход</h2>
      <form className="login_form" onSubmit={handleButton}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={updateLogin}
        />
        <input
          type="password"
          value={password}
          onChange={updatePassword}
          placeholder="Password"
        />
        <button>Войти</button>
      </form>
    </div>
  );
};

export default Login;
