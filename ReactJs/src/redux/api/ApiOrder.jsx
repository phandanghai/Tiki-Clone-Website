import axios from 'axios';
import { URL_CALL_API } from '../../constant';
import { setOrderFailed, setOrderStart, setOrderSuccess } from '../sliders/AdminStateSlider';
import { setOrdersStart, setOrdersSuccess, setOrdersFailed } from '../sliders/orderSilder';
import moment from 'moment';
export const ApiGetAllOrder = async (dispatch) => {
   try {
      dispatch(setOrderStart());
      const result = await axios.get(`${URL_CALL_API}/api/orders/getAllOrders`);
      const res = result?.data?.orders?.map((item) => {
         const date = new Date(item.create_at);
         return {
            ...item,
            id: item.id_order,
            date_time: moment(date).format('DD.MM.YYYY'),
         };
      });
      dispatch(setOrderSuccess(res));
      return result;
   } catch (error) {
      dispatch(setOrderFailed());
      console.log(error);
   }
};

export const ApiGetOrderByUser = async (dispatch, { id_user }) => {
   try {
      dispatch(setOrdersStart());
      const result = await axios.post(`${URL_CALL_API}/api/orders/getOrderByUser`, {
         id_user,
      });
      dispatch(setOrdersSuccess(result.data.orders));
      return result;
   } catch (error) {
      console.log(error);
      setOrdersFailed();
   }
};

export const ApiCreateOrder = async (dispatch, { id_user, id_product, number_order, status_order }) => {
   try {
      dispatch(setOrdersStart());
      const result = await axios.post(`${URL_CALL_API}/api/orders/createOrder`, {
         id_user,
         id_product,
         number_order,
         status_order,
      });
      dispatch(setOrdersSuccess(result.data.order));
      return result;
   } catch (error) {
      console.log(error);
      dispatch(setOrdersFailed());
   }
};
export const ApiDeleteOrder = async ({ id_order }) => {
   try {
      console.log({ id_order });
      const result = await axios.post(`${URL_CALL_API}/api/orders/deleteOrder`, {
         id_order,
      });
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiGetListOrder = async (listIds) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/orders/getListOrder`, listIds);
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiCheckIsOrderByUser = async ({ id_user, id_product }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/orders/checkIsOrderByUser`, {
         id_user,
         id_product,
      });
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiUpdateOrderByUser = async ({ id_order, status_order, number_order, address_order }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/orders/updateOrderByUser`, {
         id_order,
         status_order,
         number_order,
         address_order,
      });
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiUpdateAddressForListOrder = async ({ address, listOrder }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/orders/updateAddressForListOrder`, {
         address,
         listOrder,
      });
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiUpdateStatusForListOrder = async ({ status_order, listOrder }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/orders/updateStatusForListOrder`, {
         status_order,
         listOrder,
      });
      return result;
   } catch (error) {
      console.log(error);
   }
};
