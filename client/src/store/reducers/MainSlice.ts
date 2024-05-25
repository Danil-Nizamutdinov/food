import { createSlice } from "@reduxjs/toolkit";
import { MainState } from "../../types/main";
import {
  setCategorys,
  setRestaurants,
  setShop,
  setShopItems,
} from "./ActionCreators";

const initialState: MainState = {
  shop: [],
  restaurants: [],
  categorys: [],
  shopItems: [],
  currentName: localStorage.getItem("name") ? localStorage.getItem("name") : "",
  isCard: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateName(state, action) {
      state.currentName = action.payload;
      localStorage.setItem("name", action.payload);
    },
    toggleCard(state) {
      state.isCard = !state.isCard;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setShop.fulfilled, (state, action) => {
      state.shop = action.payload;
    });
    builder.addCase(setRestaurants.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(setCategorys.fulfilled, (state, action) => {
      state.categorys = action.payload;
    });
    builder.addCase(setShopItems.fulfilled, (state, action) => {
      state.shopItems = action.payload;
    });
  },
});

export const { updateName, toggleCard } = mainSlice.actions;

export default mainSlice.reducer;
