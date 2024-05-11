import { TrackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | TrackType; //св-во currentTrack будет отвечать за текущий трек, который мы выбрали из списка
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    genre: string[];
    searchValue: string;
  };
  filteredTracks: TrackType[];
  initialTracks: TrackType[];
};

//Начальное состояние
const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
  filterOptions: {
    author: [],
    genre: [],
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: TrackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{
        track: TrackType;
        tracksData: TrackType[];
      }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPreviousTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        genre?: string[];
        searchValue?: string;
      }>
    ) => {
      state.filterOptions = {
        genre: action.payload.genre || state.filterOptions.genre,
        author: action.payload.author || state.filterOptions.author,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
      };
      state.filteredTracks = state.initialTracks.filter((track) => {
        const hasAuthors = state.filterOptions.author.length !== 0;
        const hasGenres = state.filterOptions.genre.length !== 0;
        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(track.author)
          : true;
        const isGenres = hasGenres
          ? state.filterOptions.genre.includes(track.genre)
          : true;
        const hasSearchValue = track.name
          .toLowerCase()
          .includes(state.filterOptions.searchValue.toLowerCase());
        return isAuthors || isGenres && hasSearchValue;
      });
    },
  },
});

export const {
  setInitialTracks,
  setCurrentTrack,
  setNextTrack,
  setPreviousTrack,
  setIsShuffle,
  setIsPlaying,
  setFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
