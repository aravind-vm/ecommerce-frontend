import React, { useDispatch, useSelector } from "react-redux";
import classes from "./CheckoutPage.module.css";
import { uiSliceAction } from "../Store/ui-slice";
import { useEffect } from "react";
import Notification from "../Components/Notification/Notification";
import {
  checkoutCartHandler,
  cancelOrderCartHandler,
} from "../Store/cart-slice";
import { getUserDetailsHandler } from "../Store/user-slice";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.cart.orderStatus);
  const user = useSelector((state) => state.user.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const orderId = useSelector((state) => state.cart.orderId);
  const accessToken = useSelector((state) => state.user.accessToken);
  const buyHandler = () => {
    dispatch(
      checkoutCartHandler(
        { orderId, deliveryAddressId: user.address.id },
        accessToken
      )
    );
  };
  const cancelHandler = () => {
    dispatch(cancelOrderCartHandler(orderId), accessToken);
  };
  useEffect(() => {
    if (showCart) {
      dispatch(uiSliceAction.toggleCartVisibility());
    }
    dispatch(getUserDetailsHandler(user.id, accessToken));
  }, []);
  const content = (
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
        <div className={classes.addresscon}>
          <span>Address:</span>
          <div>{`   ${user.address.name}`}</div>
          <div>{`   ${user.address.city}`}</div>
          <div>{`   ${user.address.state}`}</div>
          <div>{`   ${user.address.country}`}</div>
          <div>{`   ${user.address.pincode}`}</div>
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
  return <>{user.address.name && content}</>;
};

export default CheckoutPage;
