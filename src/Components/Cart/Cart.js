import { useDispatch, useSelector } from "react-redux";

import Card from "../../UI/Card/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../../UI/Modal/Modal";
import { uiSliceAction } from "../../Store/ui-slice";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiSliceAction.toggleCartVisibility());
  };
  //const cartItems = useSelector((state) => state.cart.items);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const orderId = useSelector((state) => state.cart.orderId);
  return (
    <Modal onCloseModal={toggleCartHandler}>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <CartItem key={item.skuId} item={{ item, orderId }} />
          ))}
          <li>
            <h2>Total=${totalPrice}</h2>
          </li>
          <button className={classes.btnClose} onClick={toggleCartHandler}>
            Close
          </button>
          <Link to="/checkout">
            <button className={classes.btnPurchase} disabled={totalPrice === 0}>
              Purchase
            </button>
          </Link>
        </ul>
      </Card>
    </Modal>
  );
};

export default Cart;
