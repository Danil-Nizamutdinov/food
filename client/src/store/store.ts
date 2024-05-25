import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/MainSlice";
import basketReducer from "./reducers/BasketSlice";
import mapReducer from "./reducers/MapSlice";

const rootReducer = combineReducers({
  mainReducer,
  basketReducer,
  mapReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
