import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cart-slice";
import productCategorySliceReducer from "./productCategory-slice";
import productListSliceReducer from "./productList-slice";
import uiSliceReducer from "./ui-slice";
import userSliceReducer from "./user-slice";
const store = configureStore({
  reducer: {
    pCategory: productCategorySliceReducer,
    pList: productListSliceReducer,
    ui: uiSliceReducer,
    user: userSliceReducer,
    cart: cartSliceReducer,
  },
});

export default store;
