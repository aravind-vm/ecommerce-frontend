import React, { useEffect, useCallback } from "react";
import Card from "../../UI/Card/Card";
import classes from "./ProductList.module.css";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductListHandler } from "../../Store/productList-slice";
import { useParams } from "react-router-dom";
import { cartAction } from "../../Store/cart-slice";

const ProductList = () => {
  const productCategoryList = useSelector((state) => state.pCategory.data);
  const dispatch = useDispatch();
  const params = useParams();
  const categoryId = parseInt(params.id);
  const category = productCategoryList.filter(
    (item) => parseInt(item.id) === categoryId
  );

  const categoryName = category[0].categoryName;

  useEffect(() => {
    dispatch(fetchProductListHandler(categoryId));
    dispatch(cartAction.clearskuOutOfStock());
  }, [fetchProductListHandler]);

  const productList = useSelector((state) => state.pList.data);

  let productListTile;
  if (!productList || productList.length === 0) {
    productListTile = (
      <h2>
        <p>No product found</p>
      </h2>
    );
  } else {
    productListTile = productList.map((item) => {
      return <Product productItem={item} key={item.id}></Product>;
    });
  }

  return (
    <>
      {productList.length !== 0 && (
        <div className={classes.title}>{categoryName}</div>
      )}
      <Card className={classes.pcList}>{productListTile}</Card>
      {productList.length !== 0 && (
        <div className={classes.button}>
          <button> &lt;</button>
          <button> &gt;</button>
        </div>
      )}
    </>
  );
};

export default ProductList;
