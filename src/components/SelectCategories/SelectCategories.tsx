import { ChangeEvent } from "react";
import { useGetCategoriesQuery } from "../../store/product/productApi";
import styles from "./SelectCategories.module.css";
import { Category } from "../../types/Cart.types";

interface ISelectCategories {
  handleChangeCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectCategories = ({
  handleChangeCategory,
}: ISelectCategories) => {
  const { data } = useGetCategoriesQuery(null);

  return (
    <select className={styles.select} onChange={handleChangeCategory}>
      <option defaultValue="" hidden>
        select a category
      </option>
      <option value="">all categories</option>
      {data?.map((item: Category, index: number) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};
