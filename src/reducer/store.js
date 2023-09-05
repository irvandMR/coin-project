import { configureStore } from "@reduxjs/toolkit";
import { coinReducer, detailReducer } from "./slice/coinSlice";

const store = configureStore({
  reducer: {
    coin: coinReducer, 
    detail: detailReducer
  },
});

export default store;
