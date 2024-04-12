import styles from "./Filters.module.css"
import classNames from "classnames"

export default function Filters() {
  return (
    <div className={styles.centerblockFilter}>
              <div className={styles.filterTitle}>Искать по:</div>
              <div className={classNames(styles.filterButton, styles._btnText)}>
                исполнителю
              </div>
              <div className={classNames(styles.filterButton, styles._btnText)}>
                году выпуска
              </div>
              <div className={classNames(styles.filterButton, styles._btnText)}>жанру</div>
            </div>
          )
        }