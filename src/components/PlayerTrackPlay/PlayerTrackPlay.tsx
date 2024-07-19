import { TrackType } from "@/types";
import styles from "./PlayerTrackPlay.module.css";
import classNames from "classnames";
import { useState } from "react";
import { setDislike, setLike } from "@/api/tracks";
import { useAppSelector } from "@/hooks";

type TrackPlayType = {
  track: TrackType;
};

export default function PlayerTrackPlay({ track}: TrackPlayType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const [isLiked, setIsLiked] = useState<any>();//Нужно поискать(includes, как в slice) в LikedTracks[] есть ли currentTrack.id
  const token = useAppSelector((state) => state.auth.tokens);

  const user = useAppSelector((state) => state.auth.user);

  const handleLikeClick = (e:any) => {
    
    e.stopPropagation();
    if (!token.access || !token.refresh || !user) {
      return;
    }

    isLiked
      ? setDislike(token.access, currentTrack?.id)
      : setLike(token.access, currentTrack?.id);
    setIsLiked(!isLiked);
  };
  return (
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <span className={styles.trackPlayAuthorLink}>{track.name}</span>
        </div>
        <div className={styles.trackPlayAlbum}>
          <span className={styles.trackPlayAlbumLink}>{track.author}</span>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div
          onClick={(e) => handleLikeClick(e)}
          className={classNames(styles.trackPlayLike, styles.btnIcon)}
        >
          <svg className={(isLiked || track.stared_user?.find(x => x.id == user?.id )) ? styles.trackPlayLikeSvg : styles.trackPlayDislikeSvg  }>
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </svg>
        </div>
      </div>
    </div>
  );
}
