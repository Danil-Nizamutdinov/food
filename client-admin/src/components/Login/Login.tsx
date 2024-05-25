import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser } from "../../store/reducers/ActionCreators";
import Input from "../Input";
import ErrorForm from "../ErrorForm";

const Login: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const error = useAppSelector((state) => state.userReducer.error);

  const dispatch = useAppDispatch();

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUser({ email: login, password }));
  };

  return (
    <div className="login">
      <h2 className="login_title">Вход</h2>
      <form className="login_form" onSubmit={handleButton}>
        <ErrorForm error={error} />
        <Input
          value={login}
          setValue={setLogin}
          placeholder="Login"
          type="Login"
        />
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Password"
          type="password"
        />
        <button>Войти</button>
      </form>
    </div>
  );
};

export default Login;
