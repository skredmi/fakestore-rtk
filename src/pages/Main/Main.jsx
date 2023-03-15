import React, { useMemo, useState } from "react";
import { FadeLoader } from "react-spinners";
import styles from "./Main.module.css";
import { useGetProductsQuery } from "../../store/product/productApi";
import { CartDropdown } from "../../components/CartDropdown/CartDropdown";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { PopupProductItem } from "../../components/PopupProductItem/PopupProductItem";
import { SelectCategories } from "../../components/SelectCategories/SelectCategories";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilter } from "../../store/filter/filterSlice";

export const Main = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  const filteredCards = useSelector((state) => state.filter[0]);

  const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);

  const handleCardClick = (product) => {
    setIsOpenCardPopup(!isOpenCardPopup);
    setSelectedCard(product);
  };

  const handleCloseCardPopup = () => {
    setIsOpenCardPopup(false);
    setSelectedCard([]);
  };

  const handleChangeCategory = (evt) => {
    dispatch(clearFilter());
    const filteredCategory = data?.filter(
      (item) => item.category === evt.target.value
    );
    dispatch(setFilter(filteredCategory));
  };
  const getFilteredProduct = () => {
    console.log(filteredCards);
    if (!filteredCards || !filteredCards.length) return data;
    return filteredCards;
  };
  const filteredProduct = useMemo(getFilteredProduct, [filteredCards, data]);

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
          {error.originalStatus} {error.status}
        </div>
      ) : (
        <div className={styles.card}>
          {filteredProduct?.map((product) => (
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
