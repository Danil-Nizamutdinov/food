import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  getUserInfo,
  updateName,
  updateRole,
} from "../../store/reducers/ActionCreators";

const items: { value: string; label: string }[] = [
  { value: "shop", label: "shop" },
  { value: "restaurant", label: "restaurant" },
];

const Name = () => {
  const [value, setValue] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  const { user, userInfo } = useAppSelector((state) => state.mainReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo(user.id));
  }, []);

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateName(user.id, name));
    setName("");
  };
  const handleButton2 = () => {
    dispatch(updateRole(user.id, value));
  };

  return (
    <div className="name">
      <div>
        <h2>Название магазина</h2>
        <form className="form_name" onSubmit={handleButton}>
          <input
            type="text"
            placeholder="введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input_default"
          />
          <button className="button_gray">изменить название</button>
        </form>
        <div>
          {userInfo && userInfo.name ? (
            <span>
              {userInfo.name} {userInfo.role}
            </span>
          ) : (
            "пока что нет"
          )}
        </div>
      </div>
      <div>
        <h2>выберите роль</h2>
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
          <button style={{ marginTop: 15 }} onClick={handleButton2}>
            выбрать роль
          </button>
        </div>
      </div>
    </div>
  );
};

export default Name;
