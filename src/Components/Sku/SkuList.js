import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { addToCartHandler, createCartHandler } from "../../Store/cart-slice";
import classes from "./SkuList.module.css";
const SkuList = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const accessToken = useSelector((state) => state.user.accessToken);
  const location = useLocation();
  const [skuList, setSkuList] = useState([]);
  const [sku, setSku] = useState({});
  const params = useParams();
  const orderId = useSelector((state) => state.cart.orderId);
  const userId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();
  const productId = parseInt(params.id);
  const orderItems = useSelector((state) => state.cart.items);
  const skuOutOfStock = useSelector((state) => state.cart.skuOutOfStock);
  const navigate = useNavigate();
  const fetchSkuListHandler = useCallback(async function () {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sku/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("sku list not found!");
      }
      const data = await response.json();
      setSkuList(data);
      setSku({ data: data[0], index: 0 });
    } catch (error) {
      console.log("error");
    }
  }, []);
  useEffect(() => {
    fetchSkuListHandler();
  }, [fetchSkuListHandler]);

  if (!skuList || skuList.length === 0) {
    return (
      <h2>
        <p>No sku found</p>
      </h2>
    );
  }
  const index = sku.index;
  let prevIndex, nextIndex;
  if (index !== 0) {
    prevIndex = index - 1;
  } else {
    prevIndex = 0;
  }
  if (index !== skuList.length - 1) {
    nextIndex = index + 1;
  } else {
    nextIndex = index;
  }
  const previousItemHandler = () => {
    setSku({ data: skuList[prevIndex], index: prevIndex });
  };
  const NextItemHandler = () => {
    setSku({ data: skuList[nextIndex], index: nextIndex });
  };
  const productName = `${location.state.productName} ${sku.data.colour} ${sku.data.ram}GB ${sku.data.storage}GB`;
  const outOfStockstatus = sku.data.available_quantity === 0;
  const isSkuOutOfStock =
    skuOutOfStock.skuId === sku.data.id ? skuOutOfStock.value : false;
  const addToCartHandlerCall = () => {
    if (orderId) {
      const orderItem = orderItems.find((item) => item.skuId === sku.data.id);
      if (orderItem) {
        const quantity = orderItem.quantity + 1;
        dispatch(
          addToCartHandler(
            {
              orderId,
              item: {
                skuId: sku.data.id,
                quantity,
                name: productName,
                unitPrice: sku.data.unitPrice,
                fullfilledStockQty: orderItem.fullfilledStockQty,
              },
            },
            accessToken
          )
        );
      } else {
        dispatch(
          addToCartHandler(
            {
              orderId,
              item: {
                skuId: sku.data.id,
                quantity: 1,
                name: productName,
                unitPrice: sku.data.unitPrice,
              },
            },
            accessToken
          )
        );
      }
    } else {
      //createorder function
      dispatch(
        createCartHandler(
          {
            userId,
            item: {
              skuId: sku.data.id,
              quantity: 1,
              name: productName,
              unitPrice: sku.data.unitPrice,
            },
          },
          accessToken
        )
      );
    }
  };
  return (
    <div className={classes.outer}>
      <button onClick={() => navigate(-1)} className={classes.back}>
        &lt;=Back
      </button>
      <h2 className={classes.title}>{productName}</h2>
      <div>
        <div className={classes.imgdiv}>
          <img
            className={classes.displayimage}
            src={sku.data.imageUrl}
            alt="sku"
          ></img>
        </div>
        <div className={classes.descriptiondiv}>
          <div>
            Price{" "}
            <b className={classes.specifications}>{sku.data.unitPrice}$</b>
          </div>
          <div>
            Color{" "}
            <b
              className={classes.specifications}
              style={{ color: `${sku.data.colour}` }}
            >
              {sku.data.colour}
            </b>
          </div>
          <div>
            RAM <b className={classes.specifications}>{sku.data.ram} GB</b>
          </div>
          <div>
            Storage{" "}
            <b className={classes.specifications}>{sku.data.storage} GB</b>
          </div>
          <div className={classes.stockstatus}>
            {(outOfStockstatus || isSkuOutOfStock) && `Out of Stock`}
          </div>
          {!isLoggedIn && (
            <div style={{ color: "red" }}>
              Please Login to Add items to your cart
            </div>
          )}
          <button
            className={classes.nxtButton}
            onClick={previousItemHandler}
            disabled={index === 0}
          >
            {" "}
            &lt;Previous Item
          </button>
          <button
            className={classes.cart}
            disabled={outOfStockstatus || isSkuOutOfStock || !isLoggedIn}
            onClick={addToCartHandlerCall}
          >
            Add to cart
          </button>
          <button
            className={classes.nxtButton}
            onClick={NextItemHandler}
            disabled={index === skuList.length - 1}
          >
            {" "}
            Next Item&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkuList;
