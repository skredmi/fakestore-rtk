import React from "react";
import styles from "./CartDropdownItem.module.css";
import { BsTrash } from "react-icons/bs";

export const CartDropdownItem = ({ product, removeProduct }) => {
  return (
    <>
      <div className={styles.container}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div className={styles.description}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>${product.price}</div>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={() => removeProduct(product.id)}
      >
        <BsTrash />
      </button>
    </>
  );
};
