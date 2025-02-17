import { fetchFavoritesTracks } from "@/api/tracks";
import { TrackType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (access: string) => {
    const favoriteTracks = await fetchFavoritesTracks(access);
    return favoriteTracks;
  }
);

type PlaylistStateType = {
  currentTrack: null | TrackType; //св-во currentTrack будет отвечать за текущий трек, который мы выбрали из списка
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    genre: string[];
    order: string;
    searchValue: string;
  };
  filteredTracks: TrackType[];
  initialTracks: TrackType[];
  likedTracks: number[];
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
    order: "По умолчанию",
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
  likedTracks: [],
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
        order?: string;
        searchValue?: string;
      }>
    ) => {
      state.filterOptions = {
        genre: action.payload.genre || state.filterOptions.genre,
        author: action.payload.author || state.filterOptions.author,
        order: action.payload.order || state.filterOptions.order,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
      };
      let filteredArr = state.initialTracks.filter((track) => {
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
        return isAuthors && isGenres && hasSearchValue;
      });

      switch (state.filterOptions.order) {
        case "Сначала новые":
          filteredArr.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        case "Сначала старые":
          filteredArr.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );

          break;

        default:
          filteredArr;
          break;
      }
      state.filteredTracks = filteredArr;
    },
    likeTrack: (state, action: PayloadAction<number>) => {
      if (!state.likedTracks.includes(action.payload))
      state.likedTracks.push(action.payload);
    },
    dislike: (state, action: PayloadAction<number>) => {
      state.likedTracks = state.likedTracks.filter(
        (id) => id !== action.payload
      );
    },
    setLikedTracks: (state, action:PayloadAction<number[]>) => {
      state.likedTracks = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(
      getFavoriteTracks.fulfilled,
      (state, action:PayloadAction<TrackType[]>) => {
        state.likedTracks = action.payload.map((track:TrackType) => track.id);
      }
    );
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
  likeTrack,
  dislike,
  setLikedTracks
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
