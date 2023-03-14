import React from "react";
import styles from "./App.module.css";
import { CartDropdown } from "./components/CartDropdown/CartDropdown";
import { ProductItem } from "./components/ProductItem/ProductItem";
import { useGetProductsQuery } from "./store/product/productApi";

function App() {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>Let&apos;s find your products!</h1>
        <CartDropdown />
      </div>
      <div className={styles.card}>
      {data?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
}

export default App;