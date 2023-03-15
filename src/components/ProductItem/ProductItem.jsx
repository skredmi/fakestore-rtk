import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cart/cartSlice";
import styles from "./ProductItem.module.css";

export const ProductItem = ({ product, handleCardClick }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const isExistsInCart = cart.some((i) => i.id === product.id);

  const addProduct = () => dispatch(addItem(product));

  return (
    <div className={styles.card}>
      <div
        className={styles.container}
        onClick={() => handleCardClick(product)}
      >
        <img className={styles.image} src={product.image} alt={product.title} />
        <div className={styles.description}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>${product.price}</div>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={() => !isExistsInCart && addProduct()}
      >
        {isExistsInCart ? "Already in cart" : "Add to cart"}
      </button>
    </div>
  );
};
