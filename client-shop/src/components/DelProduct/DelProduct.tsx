import React, { useEffect, useState } from "react";
import Select from "../Product/Select";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteUserItem,
  getUserItems,
} from "../../store/reducers/ActionCreators";
import { urlImg } from "../../api/api";

const DelProduct = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { userItems, user } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserItems(categoryId, user.id, 1, 9));
  }, [categoryId]);

  const handleButton = (id: number) => {
    dispatch(deleteUserItem(user.id, id));
  };

  return (
    <div className="logo">
      <h2>Удаление</h2>
      <Select setCategoryId={setCategoryId} />
      <div className="product_list">
        {!userItems.message
          ? userItems.map(
              (u: {
                price: string;
                name: string;
                weight: string;
                id: number;
                img: string;
              }) => (
                <div className="product_box" key={u.id}>
                  <div className="product_img">
                    <img src={urlImg + u.img} alt="product" />
                  </div>
                  <div className="product_price">{u.price}р</div>
                  <div className="product_name">{u.name}</div>
                  <div className="product_weight">{u.weight}г</div>
                  <button onClick={() => handleButton(u.id)}>Удалить</button>
                </div>
              )
            )
          : ""}
      </div>
    </div>
  );
};

export default DelProduct;
