import { createSlice } from "@reduxjs/toolkit";

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState: { data: [], firstTime: true },
  reducers: {
    loadProductCategory(state, action) {
      state.data = action.payload;
    },
    firstTimeToggle(state, action) {
      state.firstTime = action.payload;
    },
  },
});

export const productCategoryAction = productCategorySlice.actions;

export const fetchProductCategoryListHandler = () => {
  return async (dispatch) => {
    try {
      console.log("fetch category");
      const response = await fetch("http://localhost:8080/api/category");
      if (!response.ok) {
        throw new Error("Product Category not found!");
      }
      const data = await response.json();
      dispatch(productCategoryAction.loadProductCategory(data));
      dispatch(productCategoryAction.firstTimeToggle(false));
    } catch (error) {
      console.log("error");
      dispatch(productCategoryAction.loadProductCategory([]));
    }
  };
};

export default productCategorySlice.reducer;
