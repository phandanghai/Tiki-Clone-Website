import { createSlice } from '@reduxjs/toolkit';

const initiaState = {
   products: [],
   loading: false,
   success: false,
};

const ProductSilder = createSlice({
   name: 'product',
   initialState: initiaState,
   reducers: {
      getProductsStart: (state, action) => {
         state.loading = true;
      },
      getProductsSuccess: (state, action) => {
         state.products = action.payload;
         state.loading = false;
         state.success = true;
      },
      getProductsFailure: (state, action) => {
         state.loading = false;
         state.success = false;
      },
   },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure } = ProductSilder.actions;
export default ProductSilder.reducer;
