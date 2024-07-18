import { createSlice } from '@reduxjs/toolkit';

const initiaState = {
   editOrder: { state: false, id_order: null },
   orders: [],
   loading: false,
   success: false,
   deleteProduct: { state: false, id_product: null },
   deleteUser: { state: false, id_user: null },
   deleteOrder: { state: false, id_order: null },
};

const orderSlice = createSlice({
   name: 'order',
   initialState: initiaState,
   reducers: {
      setEditOrder: (state, action) => {
         state.editOrder = action.payload;
      },
      setOrderStart: (state) => {
         state.loading = true;
      },
      setOrderSuccess: (state, action) => {
         state.loading = false;
         state.success = true;
         state.orders = action.payload;
      },
      setOrderFailed: (state) => {
         state.loading = false;
         state.success = false;
      },
      setDeleteProduct: (state, action) => {
         state.deleteProduct = action.payload;
      },
      setDeleteUser: (state, action) => {
         state.deleteUser = action.payload;
      },
      setDeleteOrder: (state, action) => {
         state.deleteOrder = action.payload;
      },
   },
});

export const { setEditOrder, setOrderStart, setOrderSuccess, setOrderFailed, setDeleteProduct, setDeleteUser, setDeleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
