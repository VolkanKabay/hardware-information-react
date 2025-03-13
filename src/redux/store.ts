import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { systemInfoSlice } from "./slices/systeminfo";

export const store = configureStore({
  reducer: {
    systemInfo: systemInfoSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
