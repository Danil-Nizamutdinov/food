import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { categorys } = useAppSelector((state) => state.mainReducer);

  return (
    <div>
      <h2>Каталог</h2>
      <nav>
        {categorys?.map((c: { name: string; id: number }) => (
          <NavLink to={`${c.id}`} className="nav_bar_link" key={c.id}>
            {c.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
