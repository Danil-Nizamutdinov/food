import React, { useState } from "react";
import { createUser } from "../../store/reducers/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";

const AddUser: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [value, setValue] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const items: { value: string; label: string }[] = [
    { value: "shop", label: "shop" },
    { value: "admin", label: "admin" },
  ];

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser({ email: login, password, role: value }));
  };

  return (
    <div className="add_user">
      <h2>Добавит пользователя</h2>
      <form className="add_user_form" onSubmit={handleButton}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
          className="input_text"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input_text"
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Password"
          className="input_text"
        />
        <div className="input_box_radio">
          {items.map((i) => (
            <div key={i.value}>
              <input
                type="radio"
                value={i.value}
                id={i.value}
                checked={value === i.value}
                onChange={(e) => setValue(e.target.value)}
              />{" "}
              <label htmlFor={i.value}>{i.label}</label>
            </div>
          ))}
        </div>
        <button>Создать</button>
      </form>
    </div>
  );
};

export default AddUser;
