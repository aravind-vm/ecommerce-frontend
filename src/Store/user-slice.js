import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {
      id: 6,
      name: "Aravind V M",
      email: "gmail.@gmail.com",
      contact: 9496977189,
      address: [],
    },
  }, //5-1order,6-no order
  reducers: {
    isUserLoggedIn(state, action) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});
export const userSliceAction = userSlice.actions;
export default userSlice.reducer;
