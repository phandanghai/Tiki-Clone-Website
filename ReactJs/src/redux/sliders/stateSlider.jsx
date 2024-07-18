import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   deletePopup: { state: false, id_order: null },
   loginPopup: false,
   filterPopup: false,
   widthScreen: window.innerWidth,
   AccountPopup: false,
   slug: null,
};

const stateSlider = createSlice({
   name: 'stateSlider',
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
   },
});

export const { setLoginPopup, setWWidthScreen, setAccountPopup, setSlug, setFilterPopup, setDeletePopup } = stateSlider.actions;

export default stateSlider.reducer;
