import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "app/store";

const initialState = {
  show: false,
  options: {
    position: "top-center",
    autoHideDuration: 6000,
    title: "Message",
    message: "",
    variant: "success",
  },
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.show = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    hideMessage: (state, action) => {
      state.show = false;
    },
  },
});

export const { hideMessage, showMessage } = messageSlice.actions;
export const Message = (state: AppState) => state.message;

export default messageSlice.reducer;
