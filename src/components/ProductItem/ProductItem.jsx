import React from "react";
import styles from "./ProductItem.module.css";

export const ProductItem = ({product}) => {

  return (
    <div className={styles.card}>
      <img className={styles.image} src={product.image} alt={product.title} />
      <div className={styles.description}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>${product.price}</div>
      </div>
      <button className={styles.button}>Add to cart</button>
    </div>
  );
};
