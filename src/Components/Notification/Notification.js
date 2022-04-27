import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartAction } from "../../Store/cart-slice";
import Modal from "../../UI/Modal/Modal";

import classes from "./Notification.module.css";

const Notification = () => {
  const navigate = useNavigate();
  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const dispatch = useDispatch();
  let notificationMessage;
  if (orderStatus === "SUCCESS") {
    notificationMessage = "Order Creation Successfull";
  } else if (orderStatus === "CANCELLED") {
    notificationMessage = "Order Cancelled Successfully";
  } else {
    notificationMessage =
      "Order Creation Failed due to Paymenyt Error. Please try again";
  }

  const toggleNotificationHandler = () => {
    if (orderStatus === "SUCCESS" || orderStatus === "CANCELLED") {
      dispatch(cartAction.clearCart());
      navigate("/home");
    } else {
      dispatch(cartAction.resetOrderStatus());
    }
  };
  return (
    <>
      <Modal
        onCloseModal={toggleNotificationHandler}
        className={classes.container}
      >
        <div className={classes.message}>{notificationMessage}</div>
        <button onClick={toggleNotificationHandler}>Close</button>
      </Modal>
    </>
  );
};

export default Notification;
