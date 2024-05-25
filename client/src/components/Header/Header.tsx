import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ModalBasket from "./ModalBasket";
import { toggleBasket } from "../../store/reducers/BasketSlice";
import ModalMap from "./ModalMap";
import ButtonAddress from "../ButtonAddress";

const Header = () => {
  const dispatch = useAppDispatch();
  const { currentName } = useAppSelector((state) => state.mainReducer);
  const { basket } = useAppSelector((state) => state.basketReducer);
  const { pathname } = useLocation();

  const matchShopValue = pathname.match(/^\/shop\/[^/]+$/);
  const matchShopValueValue = pathname.match(/^\/shop\/[^/]+\/[^/]+$/);

  const isMatching = matchShopValue || matchShopValueValue;

  return (
    <div className="header">
      <Link to="/" className="link">
        <h1>FoodDelivery</h1>
        {isMatching ? <span className="header_name">|{currentName}</span> : ""}
      </Link>
      <ButtonAddress />
      {basket.length === 0 ? (
        <button
          onClick={() => dispatch(toggleBasket())}
          className="defualt_button basket_button"
          style={{ width: "200px", height: "40px" }}
        >
          корзина
        </button>
      ) : (
        <button
          onClick={() => dispatch(toggleBasket())}
          className="defualt_button basket_button"
          style={{ width: "200px", height: "40px" }}
        >
          корзина | {basket.length}
        </button>
      )}
      <ModalBasket />
      <ModalMap />
    </div>
  );
};

export default Header;
