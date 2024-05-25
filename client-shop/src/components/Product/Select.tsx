import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCategory } from "../../store/reducers/ActionCreators";
import { setCurrentCategoryId } from "../../store/reducers/mainSlice";

interface SelectProps {
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Select: React.FC<SelectProps> = ({ setCategoryId }) => {
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>("выбрать категорию");

  const { category, user } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategory(user.id));
  }, []);

  const dropDownToggler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSelect((isSelect) => !isSelect);
  };

  const updateText = (text: string, id: number) => {
    setCurrentText(text);
    setCategoryId(id);
    dispatch(setCurrentCategoryId(id));
    setIsSelect((isSelect) => !isSelect);
  };

  return (
    <div className="select">
      <button className="select_button" onClick={dropDownToggler}>
        {currentText}
      </button>
      <div className={`select_box ${isSelect && "select_box_active"}`}>
        {category?.map((c: { name: string; id: number }) => (
          <div
            key={c.id}
            className="select_box_item"
            onClick={() => updateText(c.name, c.id)}
          >
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
