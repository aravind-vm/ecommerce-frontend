import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productList",
  initialState: { data: [] },
  reducers: {
    loadProductList(state, action) {
      state.data = action.payload;
    },
  },
});
export const productListAction = productListSlice.actions;
export const fetchProductListHandler = (categoryId) => {
  return async (dispatch) => {
    try {
      console.log("fetch product list");
      const response = await fetch(
        `http://localhost:8080/api/products/category/${categoryId}/page/0`
      );
      if (!response.ok) {
        throw new Error("Product list not found!");
      }
      const data = await response.json();
      dispatch(productListAction.loadProductList(data.content));
    } catch (error) {
      console.log("error");
      dispatch(productListAction.loadProductList([]));
    }
  };
};

export default productListSlice.reducer;
