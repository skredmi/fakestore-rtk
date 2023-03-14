import React, { useEffect, useRef, useState } from "react";
import { BsCart, BsTrash, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../store/cart/cartSlice";
import styles from "./CartDropdown.module.css";

export const CartDropdown = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const ref = useRef(null);

  const handleToggleShowDropdown = () => {
    setIsShow(!isShow);
  };

  const removeProduct = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleClickOutside = (evt) => {
    if (ref.current && !ref.current.contains(evt.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <button className={styles.button} onClick={handleToggleShowDropdown}>
        {isShow ? <BsX /> : <BsCart />}
      </button>
      {isShow && (
        <div className={styles.dropdown} ref={ref}>
          {cart.length ? (
            <>
              {cart?.map((product) => (
                <div key={`Cart item: ${product.id}`} className={styles.card}>
                  <div className={styles.container}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.image}
                    />
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
                </div>
              ))}
            </>
          ) : (
            <div>Cart is empty</div>
          )}
        </div>
      )}
    </>
  );
};
