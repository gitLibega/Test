import styles from "./CentarBlock.module.css"
import Track from "@/components/Track/Track";
import classNames from "classnames";
import Filters from "../Filters/Filters";

export default function CenterBlock() {
  return (
    <div className={styles.mainCenterblock}>
            <div className={styles.centerblockSearch}>
              <svg className={styles.searchSvg}>
                <use href="/img/icon/sprite.svg#icon-search" />
              </svg>
              <input
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search"
              />
            </div>
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filters/>
            <div className={styles.centerblockContent}>
              <div className={styles.contentTitle}>
                <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
                <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
                <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
                <div className={classNames(styles.playlistTitleCol, styles.col04)}>
                  <svg className={styles.playlistTitleSvg}>
                    <use href="/img/icon/sprite.svg#icon-watch" />
                  </svg>
                </div>
              </div>
              <div className={styles.contentPlaylist}>
                <Track/>
              </div>
            </div>
          </div>
  )
}