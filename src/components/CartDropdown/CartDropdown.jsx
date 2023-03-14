import React, { useEffect, useRef, useState } from "react";
import { BsCart, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../store/cart/cartSlice";
import { CartDropdownItem } from "../CartDropdownItem/CartDropdownItem";
import { OrderButton } from "../OrderButton/OrderButton";
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
                  <CartDropdownItem
                    product={product}
                    removeProduct={removeProduct}
                  />
                </div>
              ))}
              <OrderButton />
            </>
          ) : (
            <div>Cart is empty</div>
          )}
        </div>
      )}
    </>
  );
};
