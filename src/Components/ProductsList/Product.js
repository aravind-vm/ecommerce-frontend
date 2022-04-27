import React from "react";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";

const Product = (props) => {
  return (
    <Link
      to={`/product/${props.productItem.id}/items`}
      className={classes.link}
      state={{ productName: props.productItem.name }}
    >
      <div className={classes.card}>
        <img
          src={props.productItem.imageUrl}
          alt={`category of ${props.productItem.name}`}
          className={classes.card__image}
        />
        <section className={classes.card__name}>
          {props.productItem.name}
        </section>
      </div>
    </Link>
  );
};

export default Product;
