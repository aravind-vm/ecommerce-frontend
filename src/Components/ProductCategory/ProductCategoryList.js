import React, { useCallback, useEffect } from "react";
import classes from "./ProductCategoryList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategoryListHandler } from "../../Store/productCategory-slice";
import ProductCategoryItem from "./ProductCategoryItem";
import Card from "../../UI/Card/Card";
import { cartAction } from "../../Store/cart-slice";

const ProductCategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategoryListHandler());
    dispatch(cartAction.clearskuOutOfStock());
  }, [fetchProductCategoryListHandler]);
  const productCategoryList = useSelector((state) => state.pCategory.data);

  let productCategoryListTile;
  if (!productCategoryList || productCategoryList.length === 0) {
    productCategoryListTile = (
      <div className={classes.error}>
        <p>No product category found</p>
      </div>
    );
  } else {
    productCategoryListTile = productCategoryList.map((item) => {
      return (
        <ProductCategoryItem
          productItem={item}
          key={item.id}
        ></ProductCategoryItem>
      );
    });
  }

  return (
    <>
      <Card className={classes.pcList}>{productCategoryListTile}</Card>
    </>
  );
};

export default ProductCategoryList;
