import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAPI } from "../../api/api";
import { AppDispatch, RootState } from "../store";
import { updateCoords, updateAddress } from "./MapSlice";
import { getAddress } from "../../api/apiMap";
import { addNewBasket, addToBasket, newName } from "./BasketSlice";

interface Data {
  limit: number;
  page: number;
}

interface ShopItems {
  categoryId: number;
  userId: number;
  page: number;
  limit: number;
}

export const setShop = createAsyncThunk("main/setShop", async (data: Data) => {
  const { limit, page } = data;
  const res = await mainAPI.getShop(limit, page);
  return res;
});

export const setRestaurants = createAsyncThunk(
  "main/setRestaurants",
  async (data: Data) => {
    const { limit, page } = data;
    const res = await mainAPI.getRestaurants(limit, page);
    return res;
  }
);

export const setCategorys = createAsyncThunk(
  "main/setCategorys",
  async (userId: number) => {
    const res = await mainAPI.getCategorys(userId);
    return res;
  }
);

export const setShopItems = createAsyncThunk(
  "main/setShopItems",
  async (data: ShopItems) => {
    const { categoryId, userId, page, limit } = data;
    const res = await mainAPI.getShopItem(categoryId, userId, page, limit);
    return res;
  }
);

export const setAddress = (event: any) => async (dispatch: AppDispatch) => {
  const clickedCoords = event.get("coords");
  dispatch(updateCoords(clickedCoords));

  try {
    const addressComponents = await getAddress(
      clickedCoords[1],
      clickedCoords[0]
    );

    const newAddress: any = {};

    addressComponents.forEach((component: any) => {
      switch (component.kind) {
        case "country":
          newAddress.country = component.name;
          break;
        case "locality":
          newAddress.locality = component.name;
          break;
        case "street":
          newAddress.street = component.name;
          break;
        case "house":
          newAddress.house = component.name;
          break;
        default:
          break;
      }
    });

    dispatch(updateAddress(newAddress));
  } catch (error) {
    alert(error);
  }
};

export const nnn =
  (name: string, product: any) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { basket, nameShop } = state.basketReducer;

    if (basket.length >= 1) {
      if (nameShop === name) {
        dispatch(addToBasket(product));
        dispatch(newName(name));
      } else {
        dispatch(addNewBasket(product));
        dispatch(newName(name));
      }
    } else {
      dispatch(addToBasket(product));
      dispatch(newName(name));
    }
  };

// getState: () => RootState
