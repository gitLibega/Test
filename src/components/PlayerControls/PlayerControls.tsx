import { PlayerControlsType } from "@/types";
import styles from "./PlayerControls.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPreviousTrack,
} from "@/store/features/playlistSlice";

export default function PlayerControls({
  togglePlay,
  isPlaying,
  isLooping,
  toggleLoop,
}: PlayerControlsType) {
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  const dispatch = useAppDispatch();
  
  const HandleNextTrack = () => {
    dispatch(setNextTrack());
    dispatch(setIsPlaying(true));
  };
  const HandlePreviousTrack = () => {
    dispatch(setPreviousTrack());
    dispatch(setIsPlaying(true));
  };
  const HandleShuffle = () => {
    if (isShuffle) {
      dispatch(setIsShuffle(false));
    } else {
      dispatch(setIsShuffle(true));
    }
  };
  return (
    <div className={styles.playerControls}>
      <div onClick={HandlePreviousTrack} className={styles.playerBtnPrev}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
        </svg>
      </div>
      <div onClick={togglePlay} className={styles.playerBtnPlay}>
        <svg className={styles.playerBtnPlaySvg}>
          <use
            xlinkHref={`/img/icon/sprite.svg#${
              isPlaying ? "icon-pause" : "icon-play"
            }`}
          />
        </svg>
      </div>
      <div onClick={HandleNextTrack} className={styles.playerBtnNext}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-next" />
        </svg>
      </div>
      <div
        onClick={toggleLoop}
        className={classNames(styles.playerBtnRepeat, styles.btnIcon)}
      >
        <svg className={styles.playerBtnRepeatSvg}>
          <use
            xlinkHref={`/img/icon/sprite.svg#${
              isLooping ? "icon-repeat" : "icon-repeat-toggled"
            }`}
          />
        </svg>
      </div>
      <div
        onClick={HandleShuffle}
        className={classNames(styles.playerBtnShuffle, styles.btnIcon)}
      >
        <svg className={styles.playerBtnShuffleSvg}>
          <use
            xlinkHref={`img/icon/sprite.svg#${
              isShuffle ? "icon-shuffle-toggled" : "icon-shuffle"
            }`}
          />
        </svg>
      </div>
    </div>
  );
}
