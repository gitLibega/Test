import styles from "./CentarBlock.module.css";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";
import Playlist from "../Playlist/Playlist";
import { trackType } from "@/types";

type PlayListType = {
  setTrack: (param: trackType) => void;
};

export default function CenterBlock({setTrack}:PlayListType) {
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters />
      <Playlist setTrack={setTrack}/>
    </div>
  );
}
