import { useAppDispatch, useAppSelector } from "@/hooks";
import { getFavoriteTracks } from "@/store/features/playlistSlice";
import { useEffect } from "react";

export function useInitializeLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  useEffect(() => {
    if (tokens.access) {
      dispatch(getFavoriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
}
 