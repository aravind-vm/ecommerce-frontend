import React from "react";
import { Link } from "react-router-dom";

import classes from "./ProductCategoryItem.module.css";

const ProductCategoryItem = (props) => {
  return (
    <>
      <div className={classes.card}>
        <img
          src={props.productItem.categoryImg}
          alt={`category of ${props.productItem.categoryName}`}
          className={classes.card__image}
        />
        <section className={classes.card__name}>
          {props.productItem.categoryName}
        </section>
        <Link to={`/category/${props.productItem.id}/products`} replace={false}>
          <button className={classes.btn}>View Category</button>
        </Link>
      </div>
    </>
  );
};

export default ProductCategoryItem;
