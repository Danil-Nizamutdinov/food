import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getUserInfo, updateLogo } from "../../store/reducers/ActionCreators";
import { urlImg } from "../../api/api";

const Logo = () => {
  const { user, userInfo } = useAppSelector((state) => state.mainReducer);
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo(user.id));
  }, []);

  const handleButton = () => {
    const formData = new FormData();
    formData.append("userId", `${user.id}`);
    formData.append("img", file);

    dispatch(updateLogo(formData));
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="logo">
      <h2>Ваш логотип</h2>
      <div className="logo_img_box">
        {userInfo && userInfo.img ? (
          <img
            src={urlImg + userInfo.img}
            alt="User Logo"
            className="logo_img"
          />
        ) : (
          <div className="none_img">загрузите логотип</div>
        )}
      </div>
      <input type="file" onChange={selectFile} />
      <div className="button_logo">
        <button className="button_gray" onClick={handleButton}>
          загрузить логотип
        </button>
      </div>
    </div>
  );
};

export default Logo;
