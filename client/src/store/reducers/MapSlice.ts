import { createSlice } from "@reduxjs/toolkit";
import { MapState } from "../../types/main";

const defualtAddress = {
  country: "",
  locality: "",
  street: "выберите город",
  house: "",
};

const initialState: MapState = {
  isMap: false,
  coords: [54.314192, 48.403132],
  address: localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address"))
    : defualtAddress,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    toggleMap(state) {
      state.isMap = !state.isMap;
    },
    updateAddress(state, action) {
      state.address = action.payload;
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    updateCoords(state, action) {
      state.coords = action.payload;
    },
  },
});

export const { toggleMap, updateAddress, updateCoords } = mapSlice.actions;

export default mapSlice.reducer;
