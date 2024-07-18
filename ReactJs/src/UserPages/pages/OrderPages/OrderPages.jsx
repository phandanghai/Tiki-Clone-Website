import React, { useEffect, useState } from 'react';
import '../.../../../../user.css';
import OrderDetal from '@userComponents/Order/OrderDetal';
import OrderButton from '../../components/Order/OrderButton';
import { ApiGetOrderByUser } from '../../../redux/api/ApiOrder';
import { useDispatch, useSelector } from 'react-redux';

const OrderPages = () => {
   const dispatch = useDispatch();
   const [listCheck, setListCheck] = useState([]);
   const [listOrder, setListOrder] = useState([]);

   const orders = useSelector((state) => state.orders.orders);
   const handleSetListCheck = (value) => {
      setListCheck(value);
   };
   useEffect(() => {
      ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem('id_user') });
   }, []);

   useEffect(() => {
      if (orders) {
         setListOrder(orders.filter((order) => order.status_order === 'Trong giỏ hàng'));
      }
   }, [orders]);
   return (
      <div className="w-full h-max p-6 pt-[25px]">
         <div className="w-full h-6">
            <h2 className="text-20 text-text-title font-medium uppercase">giỏ hàng</h2>
         </div>
         <div className="body w-full grid md:grid-cols-4 gap-6">
            <div className="col-span-3 w-[961px] h-max">
               <OrderDetal orders={listOrder} handleSetListCheck={handleSetListCheck} listCheck={listCheck} />
            </div>
            <div className="col-span-1 w-full">
               <OrderButton listCheck={listCheck} orders={listOrder} />
            </div>
         </div>
      </div>
   );
};

export default OrderPages;
