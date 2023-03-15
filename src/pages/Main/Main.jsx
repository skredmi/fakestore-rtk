import React, { useMemo, useState } from "react";
import { FadeLoader } from "react-spinners";
import styles from "./Main.module.css";
import { useGetProductsQuery } from "../../store/product/productApi";
import { CartDropdown } from "../../components/CartDropdown/CartDropdown";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { PopupProductItem } from "../../components/PopupProductItem/PopupProductItem";
import { SelectCategories } from "../../components/SelectCategories/SelectCategories";

export const Main = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleCardClick = (product) => {
    setIsOpenCardPopup(!isOpenCardPopup);
    setSelectedCard(product);
  };

  const handleCloseCardPopup = () => {
    setIsOpenCardPopup(false);
    setSelectedCard([]);
  };

  const handleChangeCategory = (evt) => {
    setSelectedCategory(evt.target.value);
  };

  const getFilteredProduct = () => {
    if (!selectedCategory || selectedCategory === "all") return data;
    return data.filter((item) => item.category === selectedCategory);
  };

  const filteredProduct = useMemo(getFilteredProduct, [selectedCategory, data]);

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
