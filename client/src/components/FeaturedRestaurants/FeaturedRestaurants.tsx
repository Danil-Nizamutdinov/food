import React, { useEffect } from "react";
import OutletList from "../OutletList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setRestaurants } from "../../store/reducers/ActionCreators";
import { Link } from "react-router-dom";

const FeaturedRestaurants = () => {
  const dispatch = useAppDispatch();
  const { restaurants } = useAppSelector((state) => state.mainReducer);

  useEffect(() => {
    dispatch(setRestaurants({ limit: 4, page: 1 }));
  }, []);

  return (
    <div className="list_content">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Рестораны</h2>
        <Link to="all-restaurants" className="all_list">
          все
        </Link>
      </div>
      <OutletList list={restaurants.userInfo} />
    </div>
  );
};

export default FeaturedRestaurants;
