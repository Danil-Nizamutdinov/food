import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const isAuth: boolean = true;
  return (
    <div className="nav_bar">
      <h2 className="nav_bar_title">Меню</h2>
      <nav className="nav">
        <NavLink to="/" className="nav_bar_link">
          Список пользователей
        </NavLink>
        <NavLink to="add_user" className="nav_bar_link">
          Добавить пользователя
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
