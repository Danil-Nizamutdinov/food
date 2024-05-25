import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleMap } from "../store/reducers/MapSlice";

const ButtonAddress = () => {
  const { address } = useAppSelector((state) => state.mapReducer);
  console.log(address);
  const dispatch = useAppDispatch();
  return (
    <button
      className="defualt_button defualt_button_gray"
      onClick={() => dispatch(toggleMap())}
    >
      {address.street} {address.house}
    </button>
  );
};

export default ButtonAddress;
