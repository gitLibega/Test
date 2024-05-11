import { VolumeType } from "@/types";
import styles from "./VolumeBar.module.css";
import classNames from "classnames";
import React from "react";

const  VolumeBar = React.memo(
  ({
  min,
  max,
  step,
  value,
  onChange,
}: VolumeType) => {
  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles.btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles.btn)}
            type="range"
            name="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
);

VolumeBar.displayName = "ProgressBar";
export default VolumeBar;