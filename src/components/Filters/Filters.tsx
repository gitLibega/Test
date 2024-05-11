"use client";
import { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./Filters.module.css";
import { filters } from "./data";
import { TrackType } from "@/types";
import { useAppDispatch } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";



export default function Filters({ tracksData }: { tracksData: TrackType[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  //Обработчик клика
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
    dispatch(setFilters({author: [], genre: []}));
  }
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        isOpened={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}
        tracksData={tracksData}
      />
      <FilterItem
        isOpened={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}
        tracksData={tracksData}
      />
      <FilterItem
        isOpened={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}
        tracksData={tracksData}
      />
    </div>
  );
}
