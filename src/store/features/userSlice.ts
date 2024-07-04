import { fetchToken, fetchUser } from "@/api/user";
import { AuthStateType, SigninFormType, userType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SigninFormType) => {
    const user = await fetchUser({ email, password });
    return user;
  }
);

export const getTokens = createAsyncThunk(
  "user/getToken",
  async ({ email, password }: SigninFormType) => {
    const tokens = await fetchToken({ email, password });
    return tokens;
  }
);

const initialState: AuthStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

//Подлючение Асинхроной функциональности
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Выход из приложения
   logout : (state) => {
    state.user = null;
    state.tokens.access = null;
    state.tokens.refresh = null;
   
    },
  },
  //Сохранение данных пользователя
  extraReducers(builder) {
    builder.addCase(
      getUser.fulfilled, //успешное выполнение операции
      (state, action: PayloadAction<userType>) => {
           state.user = action.payload     
      }
    ).addCase(
      getTokens.fulfilled, (
        state, action: PayloadAction<{access: null,
          refresh: null,}>
      ) => {
        state.tokens.access = action.payload.access;
        state.tokens.refresh = action.payload.refresh;
      }
    )    
  },
});

export const { logout } = userSlice.actions;
export const authReducer = userSlice.reducer;
