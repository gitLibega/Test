import { getTracks } from "@/api/tracks";
import Track from "../Track/Track"
import styles from "./Plaulist.module.css";
import classNames from "classnames";
import { trackType } from "@/types";

export default async function Playlist () {
  const trasksData:trackType[] = await getTracks();
  return (
    <div className={styles.centerblockContent}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use href="/img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={styles.contentPlaylist}>
          {trasksData.map((trackData) => (
            <Track key={trackData.id}
            name={trackData.name}
            author={trackData.author}
            album={trackData.album}
            />
          ))}
        </div>
      </div>
  )
}