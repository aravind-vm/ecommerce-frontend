import { useDispatch } from "react-redux";

import classes from "./CartItem.module.css";
import {
  addToCartHandler,
  removeFromCartHandler,
} from "../../Store/cart-slice";
const CartItem = (props) => {
  const totalPrice = props.item.item.quantity * props.item.item.unitPrice;
  const dispatch = useDispatch();

  //   const { title, quantity, total, price, id } = props.item;

  const removeItemHandler = () => {
    const quantity = props.item.item.quantity - 1;
    console.log("insde -");
    dispatch(
      removeFromCartHandler({
        orderId: props.item.orderId,
        item: {
          skuId: props.item.item.skuId,
          quantity,
          name: props.item.item.name,
          unitPrice: props.item.item.unitPrice,
          fullfilledStockQty: props.item.item.fullfilledStockQty,
        },
      })
    );
  };

  const addItemHandler = () => {
    const quantity = props.item.item.quantity + 1;
    console.log("insde +");
    dispatch(
      addToCartHandler({
        orderId: props.item.orderId,
        item: {
          skuId: props.item.item.skuId,
          quantity,
          name: props.item.item.name,
          unitPrice: props.item.item.unitPrice,
          fullfilledStockQty: props.item.item.fullfilledStockQty,
        },
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.item.item.name}</h3>
        <div className={classes.price}>
          <span className={classes.itemprice}>
            ${props.item.item.unitPrice}
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{`${props.item.item.quantity} = $ ${totalPrice}`}</span>
          {props.item.item.outOfStock && (
            <span className={classes.oustock}>
              {`Out of Stock.Added ${props.item.item.quantity} items`}
            </span>
          )}
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button
            onClick={addItemHandler}
            disabled={props.item.item.outOfStock}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
