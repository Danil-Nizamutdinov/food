import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import { nnn, setShopItems } from "../../../store/reducers/ActionCreators";
import { urlImg } from "../../../api/api";
import plus from "../../../assets/plus.svg";
import { addToBasket } from "../../../store/reducers/BasketSlice";

const ShopProducts = () => {
  const { shopItems, currentName } = useAppSelector(
    (state) => state.mainReducer
  );
  const dispatch = useAppDispatch();

  let { id, sid } = useParams();

  const addBasket = (product: any) => {
    dispatch(nnn(currentName, product));
  };

  useEffect(() => {
    dispatch(
      setShopItems({
        categoryId: Number(sid),
        userId: Number(id),
        page: 1,
        limit: 9,
      })
    );
  }, [sid]);

  return (
    <div className="product">
      {shopItems?.map(
        (s: {
          img: string;
          price: string;
          name: string;
          weight: string;
          id: number;
        }) => (
          <div className="product_box" key={s.id}>
            <div className="product_img">
              <img src={urlImg + s.img} alt="product" />
            </div>
            <div className="product_price">{s.price}р</div>
            <div className="product_name">{s.name}</div>
            <div className="product_weight">{s.weight}г</div>
            <button className="defualt_button" onClick={() => addBasket(s)}>
              <img src={plus} alt="добавить" />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ShopProducts;
