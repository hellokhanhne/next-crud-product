import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import messageReducer from "./reducer/messageSlice";
import productSlice from "./reducer/productSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      message: messageReducer,
      products: productSlice,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
