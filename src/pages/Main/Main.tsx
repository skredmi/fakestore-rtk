import { ChangeEvent, useMemo, useState } from "react";
import { FadeLoader } from "react-spinners";
import styles from "./Main.module.css";
import { useGetProductsQuery } from "../../store/product/productApi";
import { CartDropdown } from "../../components/CartDropdown/CartDropdown";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { PopupProductItem } from "../../components/PopupProductItem/PopupProductItem";
import { SelectCategories } from "../../components/SelectCategories/SelectCategories";
import { clearFilter, setFilter } from "../../store/filter/filterSlice";
import { useTypedDispatch, useTypedSelector } from "../../hooks/hooks";
import { ICart } from "../../types/Cart.types";

export const Main = () => {
  const { data, isLoading, error } = useGetProductsQuery(null);

  const dispatch = useTypedDispatch();
  const filteredCards: ICart[] | undefined = useTypedSelector(
    (state) => state.filter
  );

  const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ICart[]>([]);

  const handleCardClick = (product: ICart[]) => {
    if (product && product.length > 0) {
      setIsOpenCardPopup(!isOpenCardPopup);
      setSelectedCard(product);
    }
  };

  const handleCloseCardPopup = () => {
    setIsOpenCardPopup(false);
    setSelectedCard([]);
  };

  const handleChangeCategory = (evt: ChangeEvent<HTMLSelectElement>) => {
    dispatch(clearFilter());
    const filteredCategory: ICart[] =
      data?.filter((item) => item.category === evt.target.value) || [];

    dispatch(setFilter(filteredCategory));
  };

  const getFilteredProduct = () => {
    if (!filteredCards?.length) return data;
    return filteredCards;
  };
  const filteredProduct = useMemo(getFilteredProduct, [filteredCards, data]);
  console.log();
  const override = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Let&apos;s find your products!</h1>
        <CartDropdown />
      </div>
      <div className={styles.selector}>
        <SelectCategories handleChangeCategory={handleChangeCategory} />
      </div>
      {isLoading ? (
        <FadeLoader color="rgb(20 83 45)" cssOverride={override} />
      ) : error ? (
        <div className={styles.error}>
          {(error as any).originalStatus} {(error as any).status}
        </div>
      ) : (
        <div className={styles.card}>
          {filteredProduct?.flat()?.map((product: ICart) => (
            <ProductItem
              key={product.id}
              product={product}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
      <PopupProductItem
        card={selectedCard}
        isOpen={isOpenCardPopup}
        handleCloseCardPopup={handleCloseCardPopup}
      />
    </>
  );
};
