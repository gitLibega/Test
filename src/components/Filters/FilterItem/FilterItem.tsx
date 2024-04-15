import styles from "./FilterItem.module.css";
import classNames from "classnames";

//Псевдоним типа. В нашем случае это список(item)
type FilterItemType = {
  title: string;
  list: string[]; //массив списка
  hendleFilterClick: (newFilter:string) => void;
  isOpened: boolean
}

export default function FilterItem({ hendleFilterClick, title, list, isOpened }:FilterItemType) {
  return (
    <div className={styles.wrapper}>
      <div onClick={() => hendleFilterClick(title)} className={classNames(styles.filterButton, styles._btnText)}>
        {title}
      </div>
      {isOpened &&(<ul className={styles.filterList}>
        {/* не совсем понятна данная запись */}
        {list.map((item) => (   
          <li className={styles.filterItem} key={item}>{item}</li>
        ))}
      </ul>)}
    </div>
  );
}
