import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartData",
  initialState: {
    orderId: null,
    item: {
      skuId: null,
      quantity: null,
      fullfilledStockQty: null,
      outOfStock: false,
      name: null,
      unitPrice: 0,
    },
    items: [],
    totalPrice: 0,
    userId: null,
    deliveryAddressId: null,
    skuOutOfStock: { skuId: null, value: false },
    orderStatus: null,
  },
  reducers: {
    addProduct(state, action) {
      const input = action.payload.item;
      if (state.items.some((item) => item.skuId === input.skuId)) {
        state.items = state.items.map((i) =>
          i.skuId === input.skuId
            ? {
                ...i,
                quantity: input.quantity,
                fullfilledStockQty: input.fullfilledStockQty,
              }
            : i
        );
      } else {
        const item = {
          skuId: action.payload.item.skuId,
          quantity: action.payload.item.quantity,
          fullfilledStockQty: action.payload.item.fullfilledStockQty,
          outOfStock: false,
          name: action.payload.item.name,
          unitPrice: action.payload.item.unitPrice,
        };
        state.items.push(item);
      }
    },
    removeProduct(state, action) {
      const input = action.payload.item;
      if (input.quantity === 0) {
        state.items = state.items.filter((j) => j.skuId !== input.skuId);
      } else {
        state.items = state.items.map((i) =>
          i.skuId === input.skuId
            ? {
                ...i,
                quantity: input.quantity,
                fullfilledStockQty: input.fullfilledStockQty,
              }
            : i
        );
      }
    },
    loadCartFromDB(state, action) {
      console.log(action.payload);
      state.orderId = action.payload.orderId;
      state.totalPrice = action.payload.totalPrice;
      state.userId = action.payload.userId;
      if (action.payload.items.length > 0) {
        action.payload.items.forEach((element) => {
          const itemDTO = {
            skuId: element.skuId,
            quantity: element.quantity,
            fullfilledStockQty: element.fullfilledStockQty,
            outOfStock: false,
            name: element.name,
            unitPrice: element.unitPrice,
          };
          state.items.push(itemDTO);
        });
      }
    },
    createOrder(state, action) {
      console.log(action.payload);
      state.orderId = action.payload.orderId;
      state.totalPrice = action.payload.totalPrice;
      state.userId = action.payload.userId;

      const itemDTO = {
        skuId: action.payload.item.skuId,
        quantity: action.payload.item.quantity,
        fullfilledStockQty: action.payload.item.fullfilledStockQty,
        outOfStock: false,
        name: action.payload.item.name,
        unitPrice: action.payload.item.unitPrice,
      };
      state.items.push(itemDTO);
    },
    outOfStockHandler(state, action) {
      state.items = state.items.map((i) =>
        i.skuId === action.payload
          ? {
              ...i,
              outOfStock: true,
            }
          : i
      );
      state.skuOutOfStock.skuId = action.payload;
      state.skuOutOfStock.value = true;
    },
    clearskuOutOfStock(state, action) {
      state.skuOutOfStock.skuId = null;
      state.skuOutOfStock.value = false;
    },
    clearCart(state, action) {
      state.items = [];
      state.item = null;
      state.orderId = null;
      state.totalPrice = 0;
      state.deliveryAddressId = null;
      state.skuOutOfStock.skuId = null;
      state.skuOutOfStock.value = false;
      state.orderStatus = null;
    },
    checkoutProduct(state, action) {
      state.orderStatus = action.payload;
    },
    resetOrderStatus(state, action) {
      state.orderStatus = null;
    },
  },
});
export const cartAction = cartSlice.actions;
export const addToCartHandler = (product) => {
  return async (dispatch) => {
    try {
      console.log("add item to cart");
      console.log(product);
      const response = await fetch(`http://localhost:8080/api/order/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //"Authentication": 'Bearer Token '+toekn
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Some Error!");
      }

      const data = await response.json();
      if (data.item.stockStatus === 1) {
        dispatch(cartAction.addProduct(data));
      } else {
        dispatch(cartAction.outOfStockHandler(data.item.skuId));
      }
    } catch (error) {
      console.log("error");
    }
  };
};

export const removeFromCartHandler = (product) => {
  return async (dispatch) => {
    try {
      console.log("remove order itemcart");
      console.log(product);
      const response = await fetch(`http://localhost:8080/api/order/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //"Authentication": 'Bearer Token '+toekn
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Some Error!");
      }

      const data = await response.json();
      console.log(data);

      dispatch(cartAction.removeProduct(data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const createCartHandler = (product) => {
  return async (dispatch) => {
    try {
      console.log("create order cart");
      console.log(product);
      const response = await fetch(`http://localhost:8080/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authentication": 'Bearer Token '+toekn
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Some Error!");
      }

      const data = await response.json();
      console.log(data);
      if (data.item.stockStatus === 1) {
        console.log(1);
        dispatch(cartAction.createOrder(data));
      } else {
        dispatch(cartAction.outOfStockHandler(data.item.skuId));
      }
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchCartFromDBHandler = (userId) => {
  return async (dispatch) => {
    try {
      console.log("fetch cart from db");
      const response = await fetch(`http://localhost:8080/api/order/${userId}`);
      if (!response.ok) {
        throw new Error("Some Error!");
      }

      const data = await response.json();
      if (data.orderId) {
        dispatch(cartAction.loadCartFromDB(data));
      }
    } catch (error) {
      console.log("error");
      dispatch(
        cartAction.loadCartFromDB({
          orderId: null,
          item: null,
          items: [],
          totalPrice: 0,
          orderStatus: null,
          userId: { userId },
        })
      );
    }
  };
};
export const checkoutCartHandler = (product) => {
  return async (dispatch) => {
    try {
      console.log("checkout order itemcart");
      console.log(product);
      const response = await fetch(`http://localhost:8080/api/order/checkout`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //"Authentication": 'Bearer Token '+toekn
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Some Error!");
      }

      const data = await response.json();
      console.log(data);
      if (data.orderStatus === 4) {
        //success
        console.log(1);
        dispatch(cartAction.checkoutProduct("SUCCESS"));
        console.log(2);
      } else if (data.orderStatus === 2) {
        //failed
        console.log(3);
        dispatch(cartAction.checkoutProduct("FAILED"));
        console.log(4);
      }
    } catch (error) {
      console.log("error");
    }
  };
};
export const cancelOrderCartHandler = (id) => {
  return async (dispatch) => {
    try {
      console.log("cancel order itemcart");

      const response = await fetch(
        `http://localhost:8080/api/order/cancel/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            //"Authentication": 'Bearer Token '+toekn
          },
        }
      );
      if (!response.ok) {
        throw new Error("Some Error!");
      }

      const data = await response.json();
      console.log(data);

      dispatch(cartAction.checkoutProduct("CANCELLED"));
    } catch (error) {
      console.log("error");
    }
  };
};

export default cartSlice.reducer;
