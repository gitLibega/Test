"use client";
import { TrackType } from "@/types";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";
import { order } from "../data";
import { useEffect, useState } from "react";

//Псевдоним типа. В нашем случае это список(item)
type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  tracksData: TrackType[];
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  tracksData,
}: FilterItemType) {
  const [filterNumber, SetFilterNumber] = useState<number>(0);
  const authorsList = useAppSelector(
    (state) => state.playlist.filterOptions.author
  );
  const genreList = useAppSelector(
    (state) => state.playlist.filterOptions.genre
  );
  const dispatch = useAppDispatch();
  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((track: TrackType) => track[value]) || []
      );
      return Array.from(array);
    }

    return order;
  };

  const toggleFilter = (item: string) => {
    dispatch(
      setFilters({
        author: authorsList.includes(item)
          ? authorsList.filter((el) => el !== item)
          : [...authorsList, item],
        genre: genreList.includes(item)
          ? genreList.filter((el) => el !== item)
          : [...genreList, item],
      })
    );
  };

  useEffect(() => {
    SetFilterNumber(authorsList.length || genreList.length);
  }, [authorsList.length, genreList.length]);

  getFilterList();
  return (
    <>
      {isOpened ? (
        <div>
          <div className={styles.titleFilterBox}>
            <div
              onClick={() => handleFilterClick(title)}
              className={classNames(styles.filterButton, styles.activeFilter)}
            >
              {title}
            </div>
            {filterNumber > 0 ? (
              <div className={styles.filterNumber}>{filterNumber}</div>
            ) : null}
          </div>
          <div className={styles.listContainer}>
            <ul className={styles.listBox}>
              {getFilterList().map((item) => (
                <li
                  onClick={() => {
                    toggleFilter(item);
                  }}
                  key={item}
                  className={classNames(styles.listText, {
                    [styles.listTextSelected]:
                      authorsList.includes(item) || genreList.includes(item),
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleFilterClick(title)}
          className={classNames(styles.filterButton, styles.btnText)}
        >
          {title}
        </div>
      )}
    </>
  );
}