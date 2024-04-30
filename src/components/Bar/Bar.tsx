"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import VolumeBar from "../VolumeBar/VolumeBar";
import PlayerTrackPlay from "../PlayerTrackPlay/PlayerTrackPlay";
import PlayerControls from "../PlayerControls/PlayerControls";
import { durationFormat } from "@/utils";
import { useAppSelector } from "@/hooks";

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
    audioRef.current?.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
  }, [volume, duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
    }
    setIsLooping((prev) => !prev);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(event.target.value);
      setVolume(audioRef.current.volume);
    }
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              ref={audioRef}
              src={currentTrack.track_file}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            ></audio>
            <div className={styles.trackTimeBlock}>
              <div>{durationFormat(currentTime)}</div>
              <div> / </div>
              <div>{durationFormat(duration)}</div>
            </div>
            <ProgressBar
              max={duration}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
            />
            <div className={styles.barPlayerBlock}>
              <div className={styles.barPlayer}>
                <PlayerControls
                  togglePlay={togglePlay}
                  isPlaying={isPlaying}
                  toggleLoop={toggleLoop}
                  isLooping={isLooping}
                />
                <PlayerTrackPlay track={currentTrack} />
              </div>
              <VolumeBar
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
