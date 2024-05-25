import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleMap } from "../../store/reducers/MapSlice";
import iconCross from "../../assets/close.svg";
import { setAddress } from "../../store/reducers/ActionCreators";

const ModalMap = () => {
  const { isMap, coords, address } = useAppSelector(
    (state) => state.mapReducer
  );

  const dispatch = useAppDispatch();

  const handleMapClick = (event: any) => {
    dispatch(setAddress(event));
  };

  return (
    <div
      className={`modal_map ${isMap ? "modal_map_active" : ""}`}
      onClick={() => dispatch(toggleMap())}
    >
      <div
        className={`popup_map ${isMap ? "popup_map_active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Укажите адрес доставки</h2>
        <div className="info_map">
          <span className="info_map_adres">
            {address.country} {address.locality} {address.street}{" "}
            {address.house}{" "}
          </span>
          <button className="defualt_button">ок</button>
        </div>
        <YMaps>
          <Map
            width="100%"
            height="400px"
            defaultState={{ center: coords, zoom: 12 }}
            onClick={handleMapClick}
          >
            <Placemark geometry={coords} options={{ draggable: true }} />
          </Map>
        </YMaps>
        <span className="popup_map_close" onClick={() => dispatch(toggleMap())}>
          <img src={iconCross} alt="" width="30px" />
        </span>
      </div>
    </div>
  );
};

export default ModalMap;
