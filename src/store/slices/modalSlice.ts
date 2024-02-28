import { createSlice } from "@reduxjs/toolkit";

type TypeState = {
  isOpen: boolean;
};
const initialState: TypeState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },
    openCloseModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { actions, reducer } = modalSlice;
