import { useEffect, useRef, useState } from "react";
import { BsCart, BsX } from "react-icons/bs";
import { removeItem } from "../../store/cart/cartSlice";
import { CartDropdownItem } from "../CartDropdownItem/CartDropdownItem";
import { OrderButton } from "../OrderButton/OrderButton";
import styles from "./CartDropdown.module.css";
import { useTypedDispatch, useTypedSelector } from "../../hooks/hooks";

export const CartDropdown = () => {
  const cart = useTypedSelector((state) => state.cart);
  const dispatch = useTypedDispatch();

  const [isShow, setIsShow] = useState(false);
  const ref = useRef(null);

  const handleToggleShowDropdown = () => {
    setIsShow(!isShow);
  };

  const removeProduct = (id: number) => {
    dispatch(removeItem({ id }));
  };

  const handleClickOutside = (evt: MouseEvent) => {
    if (ref.current && !(ref.current as any).contains(evt.target)) {
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
