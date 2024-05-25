import React, { useEffect, useState } from "react";
import Select from "./Select";
import {
  createUserItem,
  getLastUserItem,
} from "../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { urlImg } from "../../api/api";
import plus from "../../assets/plus.svg";

const Product = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const { user, userItem } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", `${user.id}`);
    formData.append("categoryId", `${categoryId}`);
    formData.append("img", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("weight", weight);

    dispatch(createUserItem(formData));
  };

  useEffect(() => {
    dispatch(getLastUserItem(user.id));
  }, []);

  return (
    <div className="product">
      <div>
        <h2>Создание товара</h2>
        <form onSubmit={handleButton}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Select setCategoryId={setCategoryId} />
          <input
            type="text"
            className="input_default"
            placeholder="название товара"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input_default"
            placeholder="цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            className="input_default"
            placeholder="вес в граммах"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button>Добавить</button>
        </form>
      </div>
      <div>
        <h2>последнее добавленное</h2>
        {userItem ? (
          <div className="product_box">
            <div className="product_img">
              <img src={urlImg + userItem.img} alt="product" />
            </div>
            <div className="product_price">{userItem.price}р</div>
            <div className="product_name">{userItem.name}</div>
            <div className="product_weight">{userItem.weight}г</div>
            <button>
              <img src={plus} alt="добавить" />
            </button>
          </div>
        ) : (
          "тут пусто"
        )}
      </div>
    </div>
  );
};

export default Product;
