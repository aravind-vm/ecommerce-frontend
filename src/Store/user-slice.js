import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    inValidCredentials: null,
    isLoggedIn: false,
    user: {
      id: null,
      name: null,
      email: null,
      contact: null,
      address: {
        id: null,
        name: null,
        city: null,
        state: null,
        country: null,
        pincode: null,
      },
    },
    accessToken: null,
  }, //5-1order,6-no order
  reducers: {
    loginStateHandler(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessToken = action.payload.accessToken;
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
    },
    logoutStateHandler(state, action) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.user.id = null;
      state.user.name = null;
      state.user.email = null;
      state.user.contact = null;
      state.user.address.id = null;
      state.user.address.name = null;
      state.user.address.city = null;
      state.user.address.state = null;
      state.user.address.country = null;
      state.user.address.pincode = null;
    },
    userStateHandler(state, action) {
      state.user.email = action.payload.email;
      state.user.contact = action.payload.contact;
      state.user.address.id = action.payload.address.id;
      state.user.address.name = action.payload.address.address_name;
      state.user.address.city = action.payload.address.city;
      state.user.address.state = action.payload.address.state;
      state.user.address.country = action.payload.address.country;
      state.user.address.pincode = action.payload.address.pincode;
      state.inValidCredentials = false;
    },
    inValidCredStateHandler(state, action) {
      state.inValidCredentials = action.payload;
    },
  },
});
export const userSliceAction = userSlice.actions;

export const loginHandlerCall = (credentials) => {
  return async (dispatch) => {
    try {
      console.log(JSON.stringify(credentials));
      const response = await fetch(`http://localhost:8080/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authentication": 'Bearer Token '+toekn
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        console.log(response.statusText);
        throw new Error("Some Error!");
      }

      const data = await response.json();
      console.log(data);

      dispatch(
        userSliceAction.loginStateHandler({
          isLoggedIn: true,
          name: data.name,
          accessToken: data.accessToken,
          id: data.id,
        })
      );
      return true;
    } catch (error) {
      dispatch(userSliceAction.inValidCredStateHandler(true));
      console.log(error);
    }
  };
};
export const getUserDetailsHandler = (id, accessToken) => {
  return async (dispatch) => {
    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "GET",
        headers: header,
      });
      if (!response.ok) {
        console.log(response.statusText);
        throw new Error("Some Error!");
      }

      const data = await response.json();
      console.log(data);

      dispatch(
        userSliceAction.userStateHandler({
          email: data.email,
          contact: data.mobile_number,
          address: data.address,
        })
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  };
};

export default userSlice.reducer;
