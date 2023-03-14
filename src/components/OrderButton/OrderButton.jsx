import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderButton.module.css";

export const OrderButton = () => {
  return (
    <>
      <Link to="/order">
        <button className={styles.orderButton}>Place order</button>
      </Link>
    </>
  );
};
