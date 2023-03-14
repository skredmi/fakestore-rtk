import React from "react";
import { FadeLoader } from "react-spinners";
import styles from "./Main.module.css";
import { useGetProductsQuery } from "../../store/product/productApi";
import { CartDropdown } from "../../components/CartDropdown/CartDropdown";
import { ProductItem } from "../../components/ProductItem/ProductItem";

export const Main = () => {
  const { data, isLoading, error } = useGetProductsQuery();

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
      {isLoading ? (
        <FadeLoader color="rgb(20 83 45)" cssOverride={override} />
      ) : error ? (
        <div className={styles.error}>
          {error.originalStatus} {error.status}
        </div>
      ) : (
        <div className={styles.card}>
          {data?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
