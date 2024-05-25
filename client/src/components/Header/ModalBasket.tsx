import React, { useEffect, useState } from "react";
import iconCross from "../../assets/close.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  decrementItem,
  deleteBaketItem,
  incrementItem,
  toggleBasket,
} from "../../store/reducers/BasketSlice";
import { urlImg } from "../../api/api";
import { Link } from "react-router-dom";

function ModalBasket() {
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { isBasket, basket, nameShop } = useAppSelector(
    (state) => state.basketReducer
  );

  useEffect(() => {
    if (basket.length !== 0) {
      const totalPrice = basket
        .map((b) => b.totalPrice)
        .reduce((a, b) => a + b);

      const productQuantity = basket.length;
      setQuantity(productQuantity);
      setPrice(totalPrice);
    }
  }, [basket]);

  return (
    <div
      className={`modal_basket ${isBasket ? "modal_basket_active" : ""}`}
      onClick={() => dispatch(toggleBasket())}
    >
      <div
        className={`popup_basket ${isBasket ? "popup_basket_active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {basket.length !== 0 ? (
          <>
            <div className="popup_basket_scroll">
              <h1 className="popup_basket_title">
                <div>{nameShop}</div>
                {quantity} товаров на {price}р
              </h1>
              {basket.map((b, index) => (
                <div key={index} className="popup_basket_info_content">
                  <div className="popup_basket_info">
                    <img
                      src={urlImg + b.img}
                      className="popup_basket_info_img"
                      alt="product"
                    />
                    <div className="popup_basket_info_text">
                      <h2>{b.name}</h2>
                    </div>
                  </div>
                  <div className="popup_basket_price_content">
                    <span className="popup_basket_price">{b.totalPrice}р</span>
                    <div className="popup_basket_add">
                      <button onClick={() => dispatch(decrementItem(index))}>
                        -
                      </button>
                      <span>{b.count}</span>
                      <button onClick={() => dispatch(incrementItem(index))}>
                        +
                      </button>
                    </div>
                  </div>
                  <span
                    className="del_pizza"
                    onClick={() => dispatch(deleteBaketItem(index))}
                  >
                    <img src={iconCross} alt="" />
                  </span>
                </div>
              ))}
            </div>

            <div className="popup_basket_footer_content">
              <div className="popup_basket_footer_info">
                <div>Сумма заказа</div>
                <div>{price}р</div>
              </div>
              <button onClick={() => dispatch(toggleBasket())}>
                <Link to="payment">К оформлению заказа</Link>
              </button>
            </div>
            <span
              className="popup_basket_close"
              onClick={() => dispatch(toggleBasket())}
            >
              <img src={iconCross} alt="" width="30px" />
            </span>
          </>
        ) : (
          <>
            <span
              className="popup_basket_close"
              onClick={() => dispatch(toggleBasket())}
            >
              <img src={iconCross} alt="закрыть" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalBasket;
