import React, { useEffect } from "react";
import OutletList from "../OutletList";
import { setShop } from "../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

const FeaturedShop = () => {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.mainReducer);

  useEffect(() => {
    dispatch(setShop({ limit: 4, page: 1 }));
  }, []);

  return (
    <div className="list_content">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Магазины</h2>
        <Link to="all-shop" className="all_list">
          все
        </Link>
      </div>
      <OutletList list={shop.userInfo} />
    </div>
  );
};

export default FeaturedShop;
