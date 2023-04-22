import React from "react";
import { Link } from "react-router-dom";
import styles from "./Message.module.css";

export const Message = () => {
  return (
    <>
      <h1 className={styles.text}>Thanks for order!</h1>
      <Link to="/fakestore-rtk">
      <button className={styles.backButton}>Back to catalog</button>
      </Link>
    </>
  );
};
