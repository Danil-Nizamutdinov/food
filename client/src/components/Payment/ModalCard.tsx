import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleCard } from "../../store/reducers/MainSlice";
import close from "../../assets/close.svg";

const ModalCard = () => {
  const { isCard } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`modal_card ${isCard ? "modal_card_active" : ""}`}
      onClick={() => dispatch(toggleCard())}
    >
      <div
        className={`popup_card ${isCard ? "popup_card_active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card_title">
          <h2>Добавление карты</h2>
          <img
            src={close}
            alt="закрыть"
            onClick={() => dispatch(toggleCard())}
          />
        </div>
        <form className="card_form">
          <input
            type="text"
            className="input_default card_input"
            placeholder="номер карты"
          />
          <div className="card_input_box">
            <input
              type="text"
              className="input_default card_input_b"
              placeholder="срок действия"
            />
            <input
              type="text"
              className="input_default card_input_b"
              placeholder="Код"
            />
          </div>
          <button className="defualt_button">ok</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCard;
