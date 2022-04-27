import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "cart",
  initialState: { showCart: false },
  reducers: {
    toggleCartVisibility(state, action) {
      state.showCart = !state.showCart;
    },
  },
});
export const uiSliceAction = uiSlice.actions;
export default uiSlice.reducer;
