import React, { useDispatch, useSelector } from "react-redux";
import classes from "./CheckoutPage.module.css";
import { uiSliceAction } from "../Store/ui-slice";
import { useEffect, useState } from "react";
import Notification from "../Components/Notification/Notification";
import {
  checkoutCartHandler,
  cancelOrderCartHandler,
} from "../Store/cart-slice";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.cart.orderStatus);
  const user = useSelector((state) => state.user.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [address, setAddress] = useState(user.address[0]);
  const orderId = useSelector((state) => state.cart.orderId);

  const buyHandler = () => {
    dispatch(checkoutCartHandler({ orderId, deliveryAddressId: 2 }));
  };
  const cancelHandler = () => {
    dispatch(cancelOrderCartHandler(orderId));
  };
  useEffect(() => {
    if (showCart) {
      dispatch(uiSliceAction.toggleCartVisibility());
    }
  }, []);

  return (
    <>
      {notification && <Notification></Notification>}
      <div className={classes.container}>
        <h2>Checkout</h2>
        <div>
          <span>Name:</span>
          <span>{`   ${user.name}`}</span>
        </div>
        <div>
          <span>Email:</span>
          <span>{`   ${user.email}`}</span>
        </div>
        <div>
          <span>Contact:</span>
          <span>{`   ${user.contact}`}</span>
        </div>
        <div>
          <span>Address:</span>
          <div>{`   ${user.name}`}</div>
        </div>
        <div>
          <span>Total Price:</span>
          <span>{`   $${totalPrice}`}</span>
        </div>
        <div>
          <button onClick={cancelHandler}>Cancel Order</button>
          <button onClick={buyHandler}>Proceed to Buy </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
