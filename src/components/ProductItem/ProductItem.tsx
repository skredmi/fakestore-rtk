import { addItem } from "../../store/cart/cartSlice";
import styles from "./ProductItem.module.css";
import { useTypedDispatch, useTypedSelector } from "../../hooks/hooks";
import { ICart } from "../../types/Cart.types";

interface IProduct {
  product: ICart;
  handleCardClick: (product: ICart[]) => void;
}

export const ProductItem = ({ product, handleCardClick }: IProduct) => {
  const dispatch = useTypedDispatch();

  const cart = useTypedSelector((state) => state.cart);
  const isExistsInCart = cart.some((i) => i.id === product.id);

  const addProduct = () => dispatch(addItem(product));

  return (
    <div className={styles.card}>
      {product && (
        <div
          className={styles.container}
          onClick={() => handleCardClick([product])}
        >
          <img
            className={styles.image}
            src={product.image}
            alt={product.title}
          />
          <div className={styles.description}>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>${product.price}</div>
          </div>
        </div>
      )}
      <button
        className={styles.button}
        onClick={() => !isExistsInCart && addProduct()}
      >
        {isExistsInCart ? "Already in cart" : "Add to cart"}
      </button>
    </div>
  );
};
