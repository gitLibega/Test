import { TrackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType =  {
  currentTrack: null | TrackType;    //св-во currentTrack будет отвечать за текущий трек, который мы выбрали из списка
}

//Начальное состояние
const initialState: PlaylistStateType = {
  currentTrack: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;