import axios from 'axios';
import { URL_CALL_API } from '../../constant';
import { getProductsFailure, getProductsStart, getProductsSuccess } from '../sliders/ProductSlider';

export const ApiCreateProduct = async (product) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/products/createProduct`, product);
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiGetAllProduct = async (dispatch) => {
   try {
      dispatch(getProductsStart());
      const result = await axios.get(`${URL_CALL_API}/api/products/getAllProduct`);
      dispatch(getProductsSuccess(result.data.products));
      return result;
   } catch (error) {
      dispatch(getProductsFailure());
      console.log(error);
   }
};

export const ApiGetProduct = async ({ id_product }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/products/getProduct`, { id_product });
      return result.data;
   } catch (error) {
      console.log(error);
   }
};

export const ApiDeleteProduct = async ({ id_product }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/products/deleteProduct`, { id_product });
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiUploadImage = async (listbase64) => {
   try {
      console.log(listbase64);
      const result = await axios.post(`${URL_CALL_API}/api/products/uploadImage`, listbase64);
      return result;
   } catch (err) {
      console.log(err);
   }
};

export const ApiGetBrand = async () => {
   try {
      const result = await axios.get(`${URL_CALL_API}/api/products/getBrand`);
      return result.data;
   } catch (error) {
      console.log(error);
   }
};

export const ApiGetStores = async () => {
   try {
      const result = await axios.get(`${URL_CALL_API}/api/products/getStores`);
      return result.data;
   } catch (error) {
      console.log(error);
   }
};

export const ApiGetDataFilter = async (dispatch, filter) => {
   try {
      dispatch(getProductsStart());
      console.log(filter);
      const result = await axios.post(`${URL_CALL_API}/api/products/getDataFilter`, filter);
      console.log(result.data.products);
      dispatch(getProductsSuccess(result.data.products));
      return result;
   } catch (error) {
      dispatch(getProductsFailure());
      console.log(error);
   }
};

export const ApiUpdateProduct = async (product) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/products/updateProduct`, product);
      return result;
   } catch (error) {
      console.log(error);
   }
};
