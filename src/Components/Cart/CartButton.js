import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../Store/ui-slice";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const toggleCartHandler = () => {
    dispatch(uiSliceAction.toggleCartVisibility());
  };

  useEffect(() => {
    let tqty = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((element) => {
        tqty += element.quantity;
      });
    }
    setTotalQuantity(tqty);
  }, [cartItems]);
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
