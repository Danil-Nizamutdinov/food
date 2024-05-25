import React, { useState } from "react";
import { createUser } from "../../store/reducers/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";
import Input from "../Input";
import InputRadio from "../InputRadio";
import ErrorForm from "../ErrorForm";

const items: { value: string; label: string }[] = [
  { value: "shop", label: "shop" },
  { value: "admin", label: "admin" },
];

const AddUser: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [copyPassword, setCopyPassword] = useState<string>("");
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || password === "" || login === "") {
      return setError("не все поля заполнены");
    }
    if (password !== copyPassword) {
      return setError("пароли не совпадают");
    }
    dispatch(createUser({ email: login, password, role: value }));
    alert("пользователь добавлен");
  };

  return (
    <div className="add_user">
      <h2>Добавит пользователя</h2>
      <form className="add_user_form" onSubmit={handleButton}>
        <Input
          value={login}
          setValue={setLogin}
          placeholder="Login"
          type="text"
        />
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Password"
          type="password"
        />
        <Input
          value={copyPassword}
          setValue={setCopyPassword}
          placeholder="Password"
          type="password"
        />
        <InputRadio items={items} value={value} setValue={setValue} />
        <ErrorForm error={error} />
        <button>Создать</button>
      </form>
    </div>
  );
};

export default AddUser;
