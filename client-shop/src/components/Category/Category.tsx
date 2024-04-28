import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createCategory,
  getCategory,
} from "../../store/reducers/ActionCreators";
import del from "../../assets/close.svg";

const Category = () => {
  const [name, setName] = useState<string>("");
  const { category, user } = useAppSelector((state) => state.mainReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategory(user.id));
  }, []);

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(user.id, name));
  };

  return (
    <div className="category">
      <div>
        <h2>Ваши категории</h2>
        {category?.map((c: { id: number; name: string; userId: number }) => (
          <div key={c.id} className="category_list_content_item">
            <div>{c.name}</div>
            <div>
              <img src={del} alt="delete" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Добавить категорию</h2>
        <form onSubmit={handleButton}>
          <input
            type="text"
            className="input_default"
            placeholder="введите"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default Category;
