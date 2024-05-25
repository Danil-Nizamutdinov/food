import React from "react";
import { urlImg } from "../api/api";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { updateName } from "../store/reducers/MainSlice";

interface SelectProps {
  list: any[];
}

const OutletList: React.FC<SelectProps> = ({ list }) => {
  const dispatch = useAppDispatch();

  const handleUpdateName = (name: string) => {
    dispatch(updateName(name));
  };

  return (
    <div className="outlet">
      {list?.map((l) => (
        <div key={l.id} className="outlet_img_box">
          <Link
            to={`/shop/${l.userId}`}
            onClick={() => handleUpdateName(l.name)}
          >
            <img src={urlImg + l.img} alt="" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OutletList;
