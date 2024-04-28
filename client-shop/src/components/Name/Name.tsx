import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getUserInfo, updateName } from "../../store/reducers/ActionCreators";

const Name = () => {
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

  return (
    <div className="name">
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
          <span>{userInfo.name}</span>
        ) : (
          "пока что нет"
        )}
      </div>
    </div>
  );
};

export default Name;
