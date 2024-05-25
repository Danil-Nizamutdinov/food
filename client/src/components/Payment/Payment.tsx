import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import ButtonAddress from "../ButtonAddress";
import { toggleCard } from "../../store/reducers/MainSlice";
import ModalCard from "./ModalCard";

const dostavka: number = 129;
const rabserv: number = 29;

const Payment = () => {
  const [price, setPrice] = useState<number | null>(null);
  const { basket, nameShop } = useAppSelector((state) => state.basketReducer);

  const dispatch = useAppDispatch();

  if (basket.length === 0) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (basket.length !== 0) {
      const totalPrice = basket
        .map((b) => b.totalPrice)
        .reduce((a, b) => a + b);

      setPrice(totalPrice);
    }
  }, [basket]);

  return (
    <div className="payment">
      <h2>{nameShop}</h2>
      <div className="payment_content">
        <div className="payment_box">
          <ButtonAddress />
          <form action="" className="payment_form">
            <div className="input_box">
              <input
                type="text"
                className="input_default"
                placeholder="Кв/офис"
              />
              <input
                type="text"
                className="input_default"
                placeholder="Домофон"
              />
              <input
                type="text"
                className="input_default"
                placeholder="Подъезд"
              />
              <input type="text" className="input_default" placeholder="Этаж" />
            </div>
            <input
              style={{ width: "100%" }}
              className="input_default"
              placeholder="Комментарий курьеру"
            />
          </form>
        </div>
        <div className="payment_box">
          <div className="payment_card">
            <h2>Добавление карты</h2>
            <button
              className="defualt_button defualt_button_gray"
              onClick={() => dispatch(toggleCard())}
            >
              изменить
            </button>
          </div>
          <div>
            <h2>Итого</h2>
            <div className="payment_result">
              <span>Стоимость товара</span>
              <span>{price}р</span>
            </div>
            <div className="payment_result">
              <span>Дотсавка</span>
              <span>{dostavka}р</span>
            </div>
            <div className="payment_result">
              <span>Работа сервиса</span>
              <span>{rabserv}р</span>
            </div>
            <div className="payment_result">
              <button className="defualt_button">оплатить</button>
              <span> {rabserv + dostavka + price} р</span>
            </div>
          </div>
        </div>
      </div>
      <ModalCard />
    </div>
  );
};

export default Payment;
