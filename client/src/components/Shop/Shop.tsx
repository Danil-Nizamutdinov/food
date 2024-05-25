import React, { useEffect } from "react";
import { Routes, Route, useParams, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCategorys } from "../../store/reducers/ActionCreators";
import NavBar from "./NavBar/NavBar";
import ShopProducts from "./ShopProducts/ShopProducts";

const Shop = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(setCategorys(Number(id)));
  }, []);
  return (
    <div className="shop">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Shop;
