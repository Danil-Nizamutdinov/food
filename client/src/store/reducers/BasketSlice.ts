import { createSlice, current } from "@reduxjs/toolkit";
import { BasketState } from "../../types/main";

const initialState: BasketState = {
  isBasket: false,
  basket: localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [],
  nameShop: localStorage.getItem("name") ? localStorage.getItem("name") : "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    toggleBasket(state) {
      state.isBasket = !state.isBasket;
    },
    addToBasket(state, action) {
      const newProduct = {
        ...action.payload,
        totalPrice: action.payload.price,
        count: 1,
      };
      state.basket.push(newProduct);
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    addNewBasket(state, action) {
      const newProduct = {
        ...action.payload,
        totalPrice: action.payload.price,
        count: 1,
      };
      state.basket = [newProduct];
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    deleteBaketItem(state, action) {
      const updatedBasket = state.basket.filter(
        (item, index) => index !== action.payload
      );
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      state.basket = updatedBasket;
    },
    incrementItem(state, action) {
      state.basket.map((item, index) => {
        if (index === action.payload) {
          item.count += 1;
          item.totalPrice += item.price;
        }
      });
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    decrementItem(state, action) {
      state.basket.map((item, index) => {
        if (index === action.payload) {
          if (item.count !== 1) {
            item.count -= 1;
            item.totalPrice -= item.price;
          }
        }
      });
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    newName(state, action) {
      state.nameShop = action.payload;
      localStorage.setItem("name", action.payload);
    },
  },
});

export const {
  toggleBasket,
  addToBasket,
  deleteBaketItem,
  incrementItem,
  decrementItem,
  newName,
  addNewBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
