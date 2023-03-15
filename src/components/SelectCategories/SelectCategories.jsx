import React from "react";
import { useGetCategoriesQuery } from "../../store/product/productApi";
import styles from "./SelectCategories.module.css";

export const SelectCategories = ({ handleChangeCategory }) => {
  const { data } = useGetCategoriesQuery();

  return (
    <select className={styles.select} onChange={handleChangeCategory}>
      <option defaultValue hidden>
        select a category
      </option>
      <option value="all">all categories</option>
      {data?.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
