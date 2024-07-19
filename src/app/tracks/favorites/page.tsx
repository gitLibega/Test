"use client";

import { fetchFavoritesTracks} from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Playlist from "@/components/Playlist/Playlist";
import { useAppSelector } from "@/hooks";
import { useUser } from "@/hooks/useUser";
import { getValueFromLocalStorage } from "@/lib/getValueFromLs";
import { setLikedTracks } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [tracksData, setLikedTracks] = useState<TrackType[]>([]);
  const { logout } = useUser();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.tokens);
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if(!token.access) {
      return;
    }
    fetchFavoritesTracks(token.access)
      .then((data: TrackType[]) => {
        if(!user) return;
        data.forEach(element => {
          element.stared_user = [user];
        });
        setLikedTracks(data);
      })
      .catch((error) => {
        if (error.message === "401") {
          logout();
          router.push("/signin");
        } else {
          alert(error.message);
        }
      });
  }, [logout, router]);
  return (
    <>
      <CenterBlock
        tracks={tracksData}
        playlist={tracksData}
        title={"Мои треки"}
      />
    </>
  );
}
