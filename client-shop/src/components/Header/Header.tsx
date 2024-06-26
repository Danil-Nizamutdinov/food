import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signOut } from "../../store/reducers/mainSlice";

const Header = () => {
  const { isAuth } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();
  const handleButton = () => {
    dispatch(signOut());
  };
  return (
    <div className="header">
      <h1>FoodDelivery</h1>
      {isAuth ? (
        <div style={{ cursor: "pointer" }} onClick={handleButton}>
          выйти
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
