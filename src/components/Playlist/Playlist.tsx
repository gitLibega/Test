"use client";
import { getTracks } from "@/api/tracks";
import Track from "../Track/Track";
import styles from "./Plaulist.module.css";
import classNames from "classnames";
import { TrackType } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";



export default function Playlist() {
  //обработка ошибок
  // let tracksData: trackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error:any) {
  //   throw new Error(error.message);
  // }
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
  //Получаем данные трека
  const [tracksData, setTracksData] = useState<TrackType[]>([]);
  useEffect(() => {
    getTracks()
      .then((data: TrackType[]) => setTracksData(data))
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
        {filteredTracks.map((track) => (
          <Track
          key={track.id} track={track} tracksData={tracks}
          />
        ))}
      </div>
    </div>
  );
}
