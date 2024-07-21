import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deletePopup: { state: false, id_order: null },
  loginPopup: false,
  filterPopup: false,
  avatarPopup: false,
  widthScreen: window.innerWidth,
  AccountPopup: false,
  slug: null,
  updateAddress: { state: false, address: null },
};

const stateSlider = createSlice({
  name: "stateSlider",
  initialState,
  reducers: {
    setLoginPopup: (state, action) => {
      state.loginPopup = action.payload;
    },
    setFilterPopup: (state, action) => {
      state.filterPopup = action.payload;
    },
    setDeletePopup: (state, action) => {
      state.deletePopup = action.payload;
    },
    setWWidthScreen: (state, action) => {
      state.widthScreen = action.payload;
    },
    setAccountPopup: (state, action) => {
      state.AccountPopup = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setAvatarPopup: (state, action) => {
      state.avatarPopup = action.payload;
    },
    setUpdateAddress: (state, action) => {
      state.updateAddress = action.payload;
    },
  },
});

export const {
  setLoginPopup,
  setWWidthScreen,
  setAccountPopup,
  setUpdateAddress,
  setSlug,
  setFilterPopup,
  setDeletePopup,
  setAvatarPopup,
} = stateSlider.actions;

export default stateSlider.reducer;
