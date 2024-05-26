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
  list: string[];
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  list,
  tracksData,
}: FilterItemType) {
  const dispatch = useAppDispatch();
  const [filterNumber, SetFilterNumber] = useState<number>(0);
 

  const orderList = useAppSelector(
    (state) => state.playlist.filterOptions.order
  );

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
        [value]: list.includes(item)
          ? list.filter((el) => el !== item)
          : [...list, item],
      })
    );
    if (list === order) {
      dispatch(
        setFilters({
          [value]: orderList === item ? "По умолчанию" : item,
        })
      );
    }
  };

  useEffect(() => {
    SetFilterNumber(
      value === "order"
        ? orderList === "Сначала новые" || orderList === "Сначала старые"
          ? 1
          : 0
        : list.length
    );
  }, [list, orderList, value]);

  getFilterList();
  return (
    <>
      {isOpened ? (
        <div>
          <div className={styles.titleFilterBox}>
            <div
              onClick={() => handleFilterClick(title)}
              className={classNames(
                styles.filterButton,
                styles.activeFilter,
                styles.btnText
              )}
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
                      list === order ? orderList === item : list.includes(item),
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.titleFilterBox}>
          <div
            onClick={() => handleFilterClick(title)}
            className={classNames(styles.filterButton, styles.btnText)}
          >
            {title}
          </div>
          {filterNumber > 0 ? (
            <div className={styles.filterNumber}>{filterNumber}</div>
          ) : null}
        </div>
      )}
    </>
  );
}