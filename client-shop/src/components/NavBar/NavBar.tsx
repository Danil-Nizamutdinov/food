import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div className="nav_bar">
      <h2 className="nav_bar_title">Меню</h2>
      <nav className="nav">
        <NavLink to="/" className="nav_bar_link">
          Название вашего магазина
        </NavLink>
        <NavLink to="logo" className="nav_bar_link">
          Добавить логотип
        </NavLink>
        <NavLink to="category" className="nav_bar_link">
          Создать категорию
        </NavLink>
        <NavLink to="product" className="nav_bar_link">
          Добавить товары
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
