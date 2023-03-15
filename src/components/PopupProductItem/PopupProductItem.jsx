import React from "react";
import classnames from "classnames";
import { BsX } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "./PopupProductItem.module.css";

export const PopupProductItem = ({ card, isOpen, handleCloseCardPopup }) => {
  const blockClass = classnames(styles.popup, {
    [styles.active]: isOpen,
  });

  return (
    <div className={blockClass}>
      <div className={styles.content}>
        <div className={styles.topContent}>
          <img
            className={styles.imageContent}
            src={card.image}
            alt={card.title}
          />
          <div className={styles.infoContent}>
            <div className={styles.titleContent}>{card.title}</div>
            <div className={styles.descriptionContent}>{card.description}</div>
            <div className={styles.rateContent}>
              <IconContext.Provider value={{ color: "#fbbf24" }}>
                <AiTwotoneStar />
              </IconContext.Provider>
              {card.rating?.rate}
            </div>
          </div>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.priceContent}>${card.price}</div>
        </div>
        <button className={styles.button} onClick={handleCloseCardPopup}>
          <BsX />
        </button>
      </div>
    </div>
  );
};
