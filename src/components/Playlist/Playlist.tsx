"use client";
import { getTracks } from "@/api/tracks";
import Track from "../Track/Track";
import styles from "./Plaulist.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import { useEffect, useState } from "react";

type PlayListType = {
  setTrack: (param: trackType) => void;
};

export default function Playlist({ setTrack }: PlayListType) {
  //обработка ошибок
  // let tracksData: trackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error:any) {
  //   throw new Error(error.message);
  // }

  //Получаем данные трека
  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks()
      .then((data: trackType[]) => setTracksData(data))
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }, []);

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
        {tracksData.map((trackData) => (
          <Track
            onClick={() => setTrack(trackData)}
            key={trackData.id}
            name={trackData.name}
            author={trackData.author}
            album={trackData.album}
            duration_in_seconds={trackData.duration_in_seconds}
          />
        ))}
      </div>
    </div>
  );
}
