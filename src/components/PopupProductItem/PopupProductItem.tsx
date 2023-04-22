import { useRef, useEffect } from "react";
import classnames from "classnames";
import { BsX } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "./PopupProductItem.module.css";
import { ICart } from "../../types/Cart.types";

interface IProductItem {
  card: ICart[];
  isOpen: boolean;
  handleCloseCardPopup: () => void;
}

export const PopupProductItem = ({
  card,
  isOpen,
  handleCloseCardPopup,
}: IProductItem) => {
  const blockClass = classnames(styles.popup, {
    [styles.active]: isOpen,
  });

  const ref = useRef(null);

  const handleClickOutside = (evt: MouseEvent) => {
    if (ref.current && !(ref.current as any).contains(evt.target)) {
      handleCloseCardPopup();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  if (!card.length) {
    return null;
  } else {
    return (
      <div className={blockClass}>
        <div className={styles.content} ref={ref}>
          <div className={styles.topContent}>
            <img
              className={styles.imageContent}
              src={card[0].image}
              alt={card[0].title}
            />
            <div className={styles.infoContent}>
              <div className={styles.titleContent}>{card[0].title}</div>
              <div className={styles.descriptionContent}>
                {card[0].description}
              </div>
              <div className={styles.rateContent}>
                <IconContext.Provider value={{ color: "#fbbf24" }}>
                  <AiTwotoneStar />
                </IconContext.Provider>
                {card[0].rating?.rate}
                {card[0].id}
              </div>
            </div>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.priceContent}>${card[0].price}</div>
          </div>
          <button className={styles.button} onClick={handleCloseCardPopup}>
            <BsX />
          </button>
        </div>
      </div>
    );
  }
};
