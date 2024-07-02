"use client";
import { getPlaylistTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Playlist from "@/components/Playlist/Playlist";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";
import { useEffect, useState } from "react";

type CategoryType = {
  params: { id: string };
};

export default function CategoryPage({ params }: CategoryType) {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
  useEffect(() => {
    getPlaylistTracks(params.id).then((tracksData) => {
      setTitle(tracksData.title)
      setTracks(tracksData.items);
      dispatch(setInitialTracks({ initialTracks: tracksData.items }));
    });
  }, [dispatch]);
  return (
    <>
      <CenterBlock
        tracks={filteredTracks}
        playlist={tracks}
        title={title}
      />
    </>
  );
}
