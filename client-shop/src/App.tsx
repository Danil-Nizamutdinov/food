import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { checkUser } from "./store/reducers/ActionCreators";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Name from "./components/Name/Name";
import Logo from "./components/Logo/Logo";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";

const App: React.FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (!isAuth || !user) {
    return (
      <div className="container">
        <Header />
        <Login />
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <div className="admin_panel">
        <NavBar />
        <Routes>
          <Route path="/" element={<Name />} />
          <Route path="logo" element={<Logo />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
