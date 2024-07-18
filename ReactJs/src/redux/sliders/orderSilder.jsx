import { createSlice } from '@reduxjs/toolkit';

const initiaState = {
   orders: [],
   loading: false,
   success: false,
};

const orderSlider = createSlice({
   name: 'orderSlider',
   initialState: initiaState,
   reducers: {
      setOrdersStart: (state) => {
         state.loading = true;
         state.success = false;
      },
      setOrdersSuccess(state, action) {
         state.orders = action.payload;
         state.success = true;
      },
      setOrdersFailed(state, action) {
         state.loading = false;
      },
   },
});

export const { setOrdersFailed, setOrdersStart, setOrdersSuccess } = orderSlider.actions;

export default orderSlider.reducer;
