`use client`

import { durationFormat } from "@/lib/durationFormat";
import styles from "./Track.module.css";
import { TrackType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playlistSlice";
import classNames from "classnames";
import { useState } from "react";
import { setDislike, setLike } from "@/api/tracks";
import { getStaticProps } from "next/dist/build/templates/pages";

type PlaylistType = {
  track: TrackType;
  tracksData: TrackType[];
};

export default function Track({ track, tracksData}: PlaylistType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const [isLiked, setIsLiked] = useState<any>();
  const { name, author, album, duration_in_seconds, id } = track;
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;
  const token = useAppSelector((state) => state.auth.tokens);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const HandleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
    dispatch(setIsPlaying(true));
  };

  const handleLikeClick = (e:any) => {
  
    e.stopPropagation();
    if (!token.access || !token.refresh || !user) {
      return;
    }

    isLiked
      ? setDislike(token.access, track?.id)
      : setLike(token.access, track?.id);
    setIsLiked(!isLiked);
  };
  return (
    <div onClick={HandleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={classNames(styles.trackTitleSvg, {
                [styles.trackIconIsplaying]: isPlaying && isCurrentTrack,
              })}>
              <use xlinkHref={`/img/icon/sprite.svg#${
                  isCurrentTrack ? "icon-isplaying" : "icon-note"
                }`} />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink} >
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink} >
            {author}
          </span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink} >
            {album}
          </span>
        </div>
        <div className={styles.trackTime}>
          <svg onClick={ (e) => handleLikeClick(e)} className={(isLiked || track.stared_user?.find(x => x.id == user?.id )) ? styles.trackPlayLikeSvg : styles.trackPlayDislikeSvg  }>
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>{durationFormat(duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
}
