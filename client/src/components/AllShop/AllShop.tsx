import React, { useEffect } from "react";
import OutletList from "../OutletList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setShop } from "../../store/reducers/ActionCreators";

const AllShop = () => {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.mainReducer);

  useEffect(() => {
    dispatch(setShop({ limit: 9, page: 1 }));
  }, []);

  return (
    <div className="list_content">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Магазины</h2>
      </div>
      <OutletList list={shop.userInfo} />
    </div>
  );
};

export default AllShop;
